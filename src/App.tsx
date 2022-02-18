import { useState } from "react";
import { MdClear, MdImage, MdSave, MdShuffle } from "react-icons/md";
import "./App.module.scss";
import { Pokemon } from "./components/Pokemon";
import { Box } from "./components/ui/Box";
import { Button } from "./components/ui/Button";
import { Error } from "./components/ui/Error";
import { Margin } from "./components/ui/Margin";
import { TextArea } from "./components/ui/TextArea";
import { Title } from "./components/ui/Title";
import {
	downloadDataUri,
	getPokemonDetails,
	PokemonData,
	shuffleArray,
	svgToPng,
} from "./utils/utils";
import domToImage from "dom-to-image";
import { TextInput } from "./components/ui/TextInput";

export function App() {
	const [pokemonNames, setPokemonNames] = useState<string>(
		localStorage.getItem("pokemonNames") ?? "",
	);

	const [pokemons, setPokemons] = useState<PokemonData[]>([]);

	const [unknownNames, setUnknownNames] = useState<string[]>([]);

	const defaultSavingItemsPerRow = 12;
	const [savingItemsPerRow, setSavingItemsPerRow] = useState<number>(
		defaultSavingItemsPerRow,
	);

	const onInput = (text: string) => {
		setPokemonNames(text);
		localStorage.setItem("pokemonNames", text);
	};

	const onSubmit = async () => {
		const newUnknwonNames = [];
		const pokemonPromises = pokemonNames
			.trim()
			.split("\n")
			.map(async name => {
				const apiName = name.trim().toLowerCase().replace(/ +/g, "-");
				try {
					return await getPokemonDetails(apiName);
				} catch (error) {
					newUnknwonNames.push(name.trim());
					return null;
				}
			});

		const pokemons = await Promise.all(pokemonPromises);

		setPokemons(pokemons.filter(pokemon => pokemon != null));
		setUnknownNames(newUnknwonNames);
	};

	const onClear = () => {
		setPokemons([]);
		setUnknownNames([]);
	};

	const onShuffle = () => {
		setPokemons(shuffleArray(pokemons));
	};

	const onSaveAsImage = async () => {
		const itemsInRow =
			savingItemsPerRow <= 0
				? defaultSavingItemsPerRow
				: savingItemsPerRow;
		setSavingItemsPerRow(itemsInRow);

		const cardMargin = 16;
		const card = document.querySelector("#pokemons > div");

		const cardWidth = card.clientWidth + cardMargin * 2;
		const cardHeight = card.clientHeight + cardMargin * 2;

		const svg = await domToImage.toSvg(
			document.getElementById("pokemons"),
			{
				width: cardWidth * itemsInRow,
				height: cardHeight * Math.ceil(pokemons.length / itemsInRow),
			},
		);

		const png = await svgToPng(svg, 2);

		downloadDataUri(png, "pokemons.png");
	};

	return (
		<>
			<Box>
				<Title size={1.5}>List Pokémon names and get images!</Title>
				<Margin v={16} />
				<TextArea onInput={onInput} value={pokemonNames} />
				<Margin v={8} />
				<p style={{ opacity: 0.5, marginLeft: 8 }}>
					It'll remember the list when you refresh the page
				</p>
				<Margin v={16} />
				<Button onClick={onSubmit}>
					<MdImage />
					Turn into images!
				</Button>
				<Margin h={16} />
				<Button gray onClick={onClear}>
					<MdClear />
					Clear images (not list)
				</Button>
				{unknownNames.length == 0 ? <></> : <Margin v={16} />}
				{unknownNames.map((name, i) => (
					<Error key={i}>
						<b style={{ textTransform: "capitalize" }}>
							{name.toLowerCase()}
						</b>{" "}
						is unknown or spelled wrong!
					</Error>
				))}
			</Box>
			{pokemons.length == 0 ? (
				<></>
			) : (
				<div
					style={{
						margin: "16px",
						display: "flex",
						alignItems: "center",
					}}
				>
					<Margin v={16} />
					<Button onClick={onShuffle} gray>
						<MdShuffle />
						Shuffle images
					</Button>
					<Margin h={32} />
					<div
						style={{
							borderLeft: "solid 1px rgba(0,0,0,0.2)",
							height: "48px",
						}}
					></div>
					<Margin h={32} />
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Button onClick={onSaveAsImage} gray>
							<MdSave />
							Download as big image
						</Button>
						<Margin v={8} />
						<p style={{ opacity: 0.5 }}>
							Might take a couple seconds
						</p>
					</div>
					<Margin h={32} />
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<p>Items per row</p>
						<Margin v={8} />
						<TextInput
							placeholder={String(defaultSavingItemsPerRow)}
							type="number"
							style={{ width: "80px" }}
							onInput={n => {
								setSavingItemsPerRow(Number(n));
							}}
							value={String(savingItemsPerRow)}
						/>
					</div>
				</div>
			)}
			<div id="pokemons">
				{pokemons.map(pokemon => (
					<Pokemon key={String(pokemon.id)} pokemon={pokemon} />
				))}
			</div>
		</>
	);
}
