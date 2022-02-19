import { createRef, useState } from "react";
import * as classes from "./App.module.scss";
import { Pokemon } from "./components/Pokemon";
import { PokemonButtons } from "./components/PokemonButtons";
import { PokemonInput } from "./components/PokemonInput";
import { Margin } from "./components/ui/Margin";
import { PokemonData } from "./utils/utils";

export function App() {
	const [pokemons, setPokemons] = useState<PokemonData[]>([]);

	const pokemonsRef = createRef<HTMLDivElement>();

	const [title, actualSetTitle] = useState(
		localStorage.getItem("title") ?? "",
	);
	const setTitle = (title: string) => {
		actualSetTitle(title);
		localStorage.setItem("title", title);
	};

	return (
		<>
			<PokemonInput pokemons={pokemons} setPokemons={setPokemons} />
			{pokemons.length == 0 ? (
				<></>
			) : (
				<PokemonButtons
					pokemons={pokemons}
					setPokemons={setPokemons}
					title={title}
					setTitle={setTitle}
					pokemonsRef={pokemonsRef}
				/>
			)}
			<Margin v={32} />
			{pokemons.length == 0 ? (
				<></>
			) : (
				<div ref={pokemonsRef}>
					{title ? <h1 className={classes.title}>{title}</h1> : <></>}
					{pokemons.map(pokemon => (
						<Pokemon key={String(pokemon.id)} pokemon={pokemon} />
					))}
				</div>
			)}
		</>
	);
}
