import { Locale } from "../../shared/constants";
import enVernacConfig from "./en";
import type { VernacConfig } from "./util";

export default class Vernac {
    public static getVernac(locale: Locale, key: keyof VernacConfig): string {
        const config = this.getVernacConfig(locale);
        return config[key] !== undefined ? config[key] : '';
    }

    private static getVernacConfig(locale: Locale): VernacConfig {
        switch (locale) {
            case Locale.EN:
            default:
                return enVernacConfig;
        }
    }
}