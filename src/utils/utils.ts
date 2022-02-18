export function classNames(names: any[]) {
	return names.filter(name => name != null).join(" ");
}

export function pokemonWeightToLbs(weight: number) {
	const kg = weight / 10;
	return kg * 2.20462262185;
}

export const pokemonTypeColorMap = {
	normal: "#A8A77A",
	fire: "#EE8130",
	water: "#6390F0",
	electric: "#F7D02C",
	grass: "#7AC74C",
	ice: "#96D9D6",
	fighting: "#C22E28",
	poison: "#A33EA1",
	ground: "#E2BF65",
	flying: "#A98FF3",
	psychic: "#F95587",
	bug: "#A6B91A",
	rock: "#B6A136",
	ghost: "#735797",
	dragon: "#6F35FC",
	dark: "#705746",
	steel: "#B7B7CE",
	fairy: "#D685AD",
};

export interface PokemonData {
	name: string;
	id: number;
	imageUrl: string;
	weight: number;
	types: string[];
}

const pokemonDetailsCache: { [name: string]: PokemonData } = {};

export async function getPokemonDetails(
	nameInput: string,
): Promise<PokemonData> {
	const name = nameInput.trim().toLowerCase();

	if (pokemonDetailsCache[name] != null) {
		return pokemonDetailsCache[name];
	}

	const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + name);

	const data: {
		name: string;
		id: number;
		sprites: {
			other: {
				"official-artwork": {
					front_default: string;
				};
			};
		};
		weight: number;
		types: {
			type: {
				name: string;
			};
		}[];
	} = await res.json();

	const pokemon: PokemonData = {
		name: data.name,
		id: data.id,
		imageUrl: data.sprites.other["official-artwork"].front_default,
		// imageUrl: data.sprites.front_default,
		weight: data.weight,
		types: data.types.map(type => type.type.name),
	};

	pokemonDetailsCache[name] = pokemon;

	return pokemon;
}

export function shuffleArray<T>(inputArray: T[]): T[] {
	let array = [...inputArray];
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}
