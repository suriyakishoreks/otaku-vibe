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
	anime: {
		mal_id: number;
		url: string;
		images: JikanImages;
		title: string;
	};
}

export interface PersonManga {
	position: string;
	manga: {
		mal_id: number;
		url: string;
		images: JikanImages;
		title: string;
	};
}

export interface PersonVoiceActor {
	anime: {
		mal_id: number;
		url: string;
		images: JikanImages;
		title: string;
	};
	character: {
		mal_id: number;
		url: string;
		images: JikanImages;
		name: string;
	};
	role: string;
}