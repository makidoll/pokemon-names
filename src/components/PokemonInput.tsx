import { useState } from "react";
import { MdClear, MdImage } from "react-icons/md";
import { getPokemonDetails, PokemonData } from "../utils/utils";
import { Box } from "./ui/Box";
import { Button } from "./ui/Button";
import { Error } from "./ui/Error";
import { Margin } from "./ui/Margin";
import { TextArea } from "./ui/TextArea";
import { Title } from "./ui/Title";

export function PokemonInput(props: {
	pokemons: PokemonData[];
	setPokemons: (pokemons: PokemonData[]) => any;
}) {
	const [pokemonNames, setPokemonNames] = useState<string>(
		localStorage.getItem("pokemonNames") ?? "",
	);

	const [unknownNames, setUnknownNames] = useState<string[]>([]);

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

		props.setPokemons(pokemons.filter(pokemon => pokemon != null));
		setUnknownNames(newUnknwonNames);
	};

	const onClear = () => {
		props.setPokemons([]);
		setUnknownNames([]);
	};

	return (
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
	);
}
