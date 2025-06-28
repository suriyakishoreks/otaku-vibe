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
import { Link, useLocation } from "react-router";
import Vernac from "../../../services/vernac";
import classNames from "classnames";
import MenuIcon from "../../atoms/icons/MenuIcon";
import { useAppDispatch } from "../../../store";
import { updateIsDrawerOpen, updateIsHeaderNavHidden } from "../../../store/slices/appContextSlice";

function HeaderNav() {
    const location = useLocation();

    return <nav className={styles.header__nav}>
        <Link to='/' >
            <Pill icon={HomeIcon} text={Vernac.getVernac('HOME')} active={location.pathname === '/'} />
        </Link>
        <Link to='/anime'>
            <Pill icon={AnimeIcon} text={Vernac.getVernac('ANIME')} active={location.pathname === '/anime'} />
        </Link>
        <Link to='/manga'>
            <Pill icon={MangaIcon} text={Vernac.getVernac('MANGA')} active={location.pathname === '/manga'} />
        </Link>
    </nav>;
}

function Header() {
    const headerRef = useRef<HTMLHeadElement>(null);
    const maxHeaderWidth = useRef<number>(0);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const dispatch = useAppDispatch();

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

    useEffect(() => {
        dispatch(updateIsHeaderNavHidden(isOverflowing));
    }, [dispatch, isOverflowing]);

    const DrawerIcon = isOverflowing ? MenuIcon : SettingIcon;

    const onDrawerClick = () => {
        dispatch(updateIsDrawerOpen(true));
    };

    return (
        <header className={styles.header} ref={headerRef}>
            <div className={classNames({ [styles.header__lhs]: true, 'no-text-select': true })} >
                <Link to='/' >
                    <Logo />
                </Link>
                {!isOverflowing && <HeaderNav />}
            </div>
            <div className={styles.header__rhs}>
                <Link to='https://github.com/suriyakishoreks/anime-list-app' target="_blank" rel="noopener noreferrer" >
                    <GithubIcon size={22} color='s-color-fg-primary' className={styles.header__actions} />
                </Link>
                <SearchIcon size={22} color='s-color-fg-primary' className={styles.header__actions} />
                <button onClick={onDrawerClick}>
                    <DrawerIcon size={22} color='s-color-fg-primary' className={styles.header__actions} />
                </button>
            </div>
        </header>
    );
}

export default Header;