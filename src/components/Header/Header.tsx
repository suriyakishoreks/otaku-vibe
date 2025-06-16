import HomeIcon from "../../assets/svg/HomeIcon";
import Logo from "../../assets/svg/LogoIcon";
import { Pill } from "../Pill";

interface HeaderProps {

}

function Header(_props: HeaderProps) {
    return (
        <div style={{ display: 'flex' }}>
            <Logo size={75} color="#fff" />
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Pill icon={HomeIcon} />
                <Pill icon={HomeIcon} />
            </div>
        </div>
    )
}

export default Header