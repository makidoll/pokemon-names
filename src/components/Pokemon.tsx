import {
	PokemonData,
	pokemonTypeColorMap,
	pokemonWeightToLbs,
} from "../utils/utils";
import * as classes from "./Pokemon.module.scss";
import { Box } from "./ui/Box";
import { Title } from "./ui/Title";

export function Pokemon(props: { pokemon: PokemonData }) {
	return (
		<Box className={classes.box}>
			<img
				className={classes.image}
				src={props.pokemon.imageUrl}
				alt={props.pokemon.name}
			/>
			<Title className={classes.name} size={1.5}>
				{props.pokemon.name}
			</Title>
			<p className={classes.weight} style={{ textAlign: "center" }}>
				{pokemonWeightToLbs(props.pokemon.weight).toFixed(1)} lbs
			</p>
			<div className={classes.types}>
				{props.pokemon.types.map(type => (
					<div
						key={type}
						className={classes.type}
						style={{
							backgroundColor: pokemonTypeColorMap[type],
						}}
					>
						{type}
					</div>
				))}
			</div>
		</Box>
	);
}
