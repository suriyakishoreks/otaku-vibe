import HomeIcon from "../../atoms/icons/HomeIcon";
import Logo from "../../atoms/icons/LogoIcon";
import { Pill } from "../../atoms/pill";
import styles from "./Header.module.scss";

function Header() {
    return (
        <header className={styles.header}>
            <Logo size={75} color={'s-color-bg-error'} />
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Pill icon={HomeIcon} text="Home" />
                <Pill icon={HomeIcon} text='Anime' />
            </div>
        </header>
    );
}

export default Header;