import type {
	CharacterRole,
	CharacterVoiceActor,
	CommonCharacterData,
	JikanImages
} from '../common';

export interface Character {
	mal_id: number;
	url: string;
	images: JikanImages;
	name: string;
	name_kanji: string;
	nicknames: string[];
	favorites: number;
	about: string;
}

export interface CharacterFull extends Character {
	anime: CharacterAnime[];
	manga: CharacterManga[];
	voices: CharacterVoiceActor[];
}

export interface CharacterAnime {
	role: CharacterRole;
	anime: CommonCharacterData & { title: string; };
}

export interface CharacterManga {
	role: CharacterRole;
	manga: CommonCharacterData & { title: string; };
}
