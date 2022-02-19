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
	pokemonsRef: React.RefObject<HTMLDivElement>;
}) {
	const defaultSavingItemsPerRow = 12;
	const [savingItemsPerRow, setSavingItemsPerRow] = useState<number>(
		defaultSavingItemsPerRow,
	);

	const onSaveAsImage = async () => {
		const pokemonsEl = props.pokemonsRef.current;
		if (pokemonsEl == null) return;

		const itemsInRow =
			savingItemsPerRow <= 0
				? defaultSavingItemsPerRow
				: savingItemsPerRow;
		setSavingItemsPerRow(itemsInRow);

		const cardMargin = 16;
		const card = pokemonsEl.querySelector("div");

		const cardWidth = card.clientWidth + cardMargin * 2;
		const cardHeight = card.clientHeight + cardMargin * 2;

		const svg = await domToImage.toSvg(pokemonsEl, {
			width: cardWidth * itemsInRow,
			height: cardHeight * Math.ceil(props.pokemons.length / itemsInRow),
		});

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
		</>
	);
}
