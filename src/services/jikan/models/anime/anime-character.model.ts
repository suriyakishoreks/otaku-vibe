import type { CharacterVoiceActor, CommonCharacter } from '../common';

export interface AnimeCharacter extends CommonCharacter {
	voice_actors: CharacterVoiceActor[];
}
