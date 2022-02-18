import { useState } from "react";
import "./App.module.scss";
import { Pokemon } from "./components/Pokemon";
import { Box } from "./components/ui/Box";
import { Button } from "./components/ui/Button";
import { Error } from "./components/ui/Error";
import { Margin } from "./components/ui/Margin";
import { TextArea } from "./components/ui/TextArea";
import { Title } from "./components/ui/Title";
import { getPokemonDetails, PokemonData } from "./utils/utils";

export function App() {
	const [pokemonNames, setPokemonNames] = useState<string>(
		localStorage.getItem("pokemonNames") ?? "",
	);

	const [pokemons, setPokemons] = useState<PokemonData[]>([]);

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

		setPokemons(pokemons.filter(pokemon => pokemon != null));
		setUnknownNames(newUnknwonNames);
	};

	const onClear = () => {
		setPokemons([]);
		setUnknownNames([]);
	};

	return (
		<>
			<Box>
				<Title size={1.5}>List Pokémon names and get images!</Title>
				<Margin margin={16} />
				<TextArea onInput={onInput} value={pokemonNames} />
				<Margin margin={8} />
				<p>It'll remember the list when you refresh the page</p>
				<Margin margin={16} />
				<Button onClick={onSubmit}>Turn into images!</Button>
				<Button gray style={{ marginLeft: "12px" }} onClick={onClear}>
					Clear images (not list)
				</Button>
				{unknownNames.length == 0 ? <></> : <Margin margin={16} />}
				{unknownNames.map((name, i) => (
					<Error key={i}>
						<b style={{ textTransform: "capitalize" }}>
							{name.toLowerCase()}
						</b>{" "}
						is unknown or spelled wrong!
					</Error>
				))}
			</Box>
			<div>
				{pokemons.map(pokemon => (
					<Pokemon key={String(pokemon.id)} pokemon={pokemon} />
				))}
			</div>
		</>
	);
}
