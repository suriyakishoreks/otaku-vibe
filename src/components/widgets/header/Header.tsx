import { useEffect, useRef, useState } from "react";
import AnimeIcon from "../../atoms/icons/AnimeIcon";
import HomeIcon from "../../atoms/icons/HomeIcon";
import { Logo } from "../../atoms/logo";
import MangaIcon from "../../atoms/icons/MangaIcon";
import SearchIcon from "../../atoms/icons/SearchIcon";
import SettingIcon from "../../atoms/icons/SettingIcon";
import { Pill } from "../../atoms/pill";
import styles from "./Header.module.scss";
import GithubIcon from "../../atoms/icons/GithubIcon";

function Header() {
    const headerRef = useRef<HTMLHeadElement>(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    // TODO: Implement this properly as custom hook
    useEffect(() => {
        const checkOverflow = () => {
            if (headerRef.current) {
                setIsOverflowing(
                    headerRef.current.scrollWidth > headerRef.current.clientWidth
                );
            }
        };
        checkOverflow();
        window.addEventListener("resize", checkOverflow);
        return () => window.removeEventListener("resize", checkOverflow);
    }, []);

    return (
        <header className={styles.header} ref={headerRef}>
            <div className={styles.header__lhs} >
                <Logo />
                {!isOverflowing && (
                    <nav className={styles.header__nav}>
                        <Pill icon={HomeIcon} text="Home" />
                        <Pill icon={AnimeIcon} text='Anime' />
                        <Pill icon={MangaIcon} text="Manga" />
                        <Pill icon={MangaIcon} text="Manhwa" />
                        <Pill icon={MangaIcon} text="Manhua" />
                    </nav>
                )}
            </div>
            <div className={styles.header__rhs}>
                <GithubIcon size={30} color='s-color-fg-primary' />
                <SearchIcon size={30} color='s-color-fg-primary' />
                <SettingIcon size={30} color='s-color-fg-primary' />
            </div>
        </header>
    );
}

export default Header;