import Vernac from "../../../services/vernac";
import AnimeIcon from "../../atoms/icons/AnimeIcon";
import HomeIcon from "../../atoms/icons/HomeIcon";
import Logo from "../../atoms/icons/LogoIcon";
import MangaIcon from "../../atoms/icons/MangaIcon";
import SettingIcon from "../../atoms/icons/SettingIcon";
import { Label } from "../../atoms/label";
import { Pill } from "../../atoms/pill";
import styles from "./Header.module.scss";

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.header__lhs} >
                <Logo size={48} color={'s-color-fg-primary'} />
                <Label as='h1' font='typo-primary-xl-medium' className={styles['header__brand-name']} >{Vernac.getVernac('en', 'APP_NAME')}</Label>
                <nav className={styles.header__nav}>
                    <Pill icon={HomeIcon} text="Home" />
                    <Pill icon={AnimeIcon} text='Anime' />
                    <Pill icon={MangaIcon} text="Manga" />
                </nav>
            </div>
            <div className={styles.header__lhs}>
                <SettingIcon size={32} color='s-color-fg-primary' />
            </div>
        </header>
    );
}

export default Header;