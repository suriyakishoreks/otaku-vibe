export const Locale = {
    EN: 'en'
} as const;
export type Locale = typeof Locale[keyof typeof Locale];

export const JIKAN_API_BASE_URL = 'https://api.jikan.moe/v4';