import { MdShuffle } from "react-icons/md";
import { PokemonData, shuffleArray } from "../utils/utils";
import { PokemonDownload } from "./PokemonDownload";
import { Border } from "./ui/Border";
import { Button } from "./ui/Button";
import { Margin } from "./ui/Margin";

export function PokemonButtons(props: {
	pokemons: PokemonData[];
	setPokemons: (pokemons: PokemonData[]) => any;
	pokemonsRef: React.RefObject<HTMLDivElement>;
}) {
	const onShuffle = () => {
		props.setPokemons(shuffleArray(props.pokemons));
	};

	return (
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
			<Border vertical="solid 1px rgba(0,0,0,0.2)" height={48} />
			<Margin h={32} />
			<PokemonDownload
				pokemons={props.pokemons}
				setPokemons={props.setPokemons}
				pokemonsRef={props.pokemonsRef}
			/>
		</div>
	);
}
