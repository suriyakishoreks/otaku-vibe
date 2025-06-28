import type { JikanImages } from './image.model';

export interface JikanPerson {
	mal_id: number;
	url: string;
	images: JikanImages;
	name: string,
	favorites: number;
	alternate_names?: string[];
	birthday?: string;
	about?: string;
}

export interface JikanPersonFull extends JikanPerson {
	anime: PersonAnime[];
	manga: PersonManga[];
	voices: PersonVoiceActor[];
}

export interface PersonAnime {
	position: string;
	anime: object;
}

export interface PersonManga {
	role: object;
	manga: object;
}

export interface PersonVoiceActor {
	anime: object;
	character: object;
	role: string;
}