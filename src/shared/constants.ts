export const Locale = {
    EN: 'en'
} as const;
export type Locale = typeof Locale[keyof typeof Locale];

