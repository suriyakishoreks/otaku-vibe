import Logo from "../../assets/svg/LogoIcon";

interface HeaderProps {

}

function Header(_props: HeaderProps) {
    return (
        <div>Header
            <Logo size={75} color="#fff" />
        </div>
    )
}

export default Header