import { Logo } from "../Logo"

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