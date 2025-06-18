import HomeIcon from "../../atoms/icons/HomeIcon";
import Logo from "../../atoms/icons/LogoIcon";
import { Pill } from "../../atoms/pill";

interface HeaderProps {

}

function Header(_props: HeaderProps) {
    return (
        <div style={{ display: 'flex' }}>
            <Logo size={75} color="#fff" />
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Pill icon={HomeIcon} text="Home" />
                <Pill icon={HomeIcon} text='Anime' />
            </div>
        </div>
    );
}

export default Header;