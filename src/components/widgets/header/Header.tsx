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
import { Link } from "react-router";

function HeaderNav() {
    return <nav className={styles.header__nav}>
        <Link to='/' >
            <Pill icon={HomeIcon} text="Home" />
        </Link>
        <Link to='/anime'>
            <Pill icon={AnimeIcon} text='Anime' />
        </Link>
        <Link to='/manga'>
            <Pill icon={MangaIcon} text="Manga" />
        </Link>
    </nav>;
}

function Header() {
    const headerRef = useRef<HTMLHeadElement>(null);
    const maxHeaderWidth = useRef<number>(0);
    const [isOverflowing, setIsOverflowing] = useState(false);

    // TODO: Implement this properly as custom hook
    useEffect(() => {
        const checkOverflow = () => {
            if (headerRef.current) {
                if (headerRef.current.scrollWidth > headerRef.current.clientWidth && maxHeaderWidth.current === 0) {
                    setIsOverflowing(true);
                    maxHeaderWidth.current = headerRef.current.scrollWidth;
                } else if (maxHeaderWidth.current > 0 && headerRef.current.scrollWidth > maxHeaderWidth.current) {
                    setIsOverflowing(false);
                    maxHeaderWidth.current = 0;
                }
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
                {!isOverflowing && <HeaderNav />}
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