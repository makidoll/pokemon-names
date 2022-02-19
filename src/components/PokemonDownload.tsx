import domToImage from "dom-to-image";
import { useState } from "react";
import { MdSave } from "react-icons/md";
import { downloadDataUri, PokemonData, svgToPng } from "../utils/utils";
import { Button } from "./ui/Button";
import { Margin } from "./ui/Margin";
import { TextInput } from "./ui/TextInput";

export function PokemonDownload(props: {
	pokemons: PokemonData[];
	setPokemons: (pokemons: PokemonData[]) => any;
	title: string;
	setTitle: (title: string) => any;
	pokemonsRef: React.RefObject<HTMLDivElement>;
}) {
	const defaultSavingItemsPerRow = 12;
	const [savingItemsPerRow, setSavingItemsPerRow] = useState<number>(
		defaultSavingItemsPerRow,
	);

	const onSaveAsImage = async () => {
		// get all elements
		const pokemonsEl = props.pokemonsRef.current;
		if (pokemonsEl == null) return;

		const titleEl = pokemonsEl.querySelector("h1");
		const cardEl = pokemonsEl.querySelector("div");

		// fix up items in row
		const itemsInRow =
			savingItemsPerRow <= 0
				? defaultSavingItemsPerRow
				: savingItemsPerRow;
		setSavingItemsPerRow(itemsInRow);

		// find widths and heights (and set title stuff dynamically)
		const cardMargin = 16;
		const cardWidth = cardEl.clientWidth + cardMargin * 2;
		const cardHeight = cardEl.clientHeight + cardMargin * 2;

		const titleMarginTop = 16;
		let titleHeight = 0;
		if (titleEl != null) {
			titleEl.style.fontSize = itemsInRow * 0.4 + "rem";
			titleHeight = titleEl.clientHeight + titleMarginTop;
		}

		// get final widths and height
		const width = cardWidth * itemsInRow;
		const height =
			cardHeight * Math.ceil(props.pokemons.length / itemsInRow) +
			titleHeight;

		// resize so title gets centered
		pokemonsEl.style.width = width + "px";

		// get svg and cleanup
		const svg = await domToImage.toSvg(pokemonsEl, { width, height });
		pokemonsEl.style.width = "";
		if (titleEl != null) titleEl.style.fontSize = "";

		// convert to png and download
		const png = await svgToPng(svg, 2);
		downloadDataUri(png, "pokemons.png");
	};

	return (
		<>
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
				<p style={{ opacity: 0.5 }}>Might take a couple seconds</p>
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
			<Margin h={32} />
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<p>Title placed on top (can be empty)</p>
				<Margin v={8} />
				<TextInput
					style={{ width: "240px" }}
					onInput={props.setTitle}
					value={props.title}
				/>
			</div>
		</>
	);
}
