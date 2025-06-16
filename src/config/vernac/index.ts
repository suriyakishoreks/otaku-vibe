import enVernacConfig from "./en";
import type { VernacConfig } from "./util";

export default class Vernac {
    public static getVernac(locale: string, key: keyof VernacConfig): string {
        const config = this.getVernacConfig(locale);
        return config[key] !== undefined ? config[key] : '';
    }

    private static getVernacConfig(locale: string): VernacConfig {
        switch (locale) {
            case 'en':
            default:
                return enVernacConfig;
        }
    }
}