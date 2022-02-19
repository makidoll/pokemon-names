import { createRef, useState } from "react";
import "./App.module.scss";
import { Pokemon } from "./components/Pokemon";
import { PokemonButtons } from "./components/PokemonButtons";
import { PokemonInput } from "./components/PokemonInput";
import { PokemonData } from "./utils/utils";

export function App() {
	const [pokemons, setPokemons] = useState<PokemonData[]>([]);

	const pokemonsRef = createRef<HTMLDivElement>();

	return (
		<>
			<PokemonInput pokemons={pokemons} setPokemons={setPokemons} />
			{pokemons.length == 0 ? (
				<></>
			) : (
				<PokemonButtons
					pokemons={pokemons}
					setPokemons={setPokemons}
					pokemonsRef={pokemonsRef}
				/>
			)}
			<div ref={pokemonsRef}>
				{pokemons.map(pokemon => (
					<Pokemon key={String(pokemon.id)} pokemon={pokemon} />
				))}
			</div>
		</>
	);
}
