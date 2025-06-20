import { Outlet } from "react-router";
import { Header } from "../../components/widgets/header";

function AppLayout() {
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>

        </div>
    );
}

export default AppLayout;