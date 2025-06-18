import enVernacConfig from "./en";
import type { VernacConfig, Locale } from "./models";

export default class Vernac {
    public static getVernac(locale: Locale, key: keyof VernacConfig): string {
        const config = this.getVernacConfig(locale);
        return config[key] !== undefined ? config[key] : '';
    }

    private static getVernacConfig(locale: Locale): VernacConfig {
        switch (locale) {
            case 'en':
            default:
                return enVernacConfig;
        }
    }
}