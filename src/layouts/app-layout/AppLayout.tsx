import { Outlet } from "react-router";
import { Header } from "../../components/widgets/header";
import styles from './AppLayout.module.scss';
import { Footer } from "../../components/widgets/footer";

function AppLayout() {
    return (
        <div className={styles['app-layout']}>
            <div>
                <Header />
                <main>
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default AppLayout;