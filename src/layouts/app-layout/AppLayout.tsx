import { Outlet } from "react-router";
import { Header } from "../../components/widgets/header";
import styles from './AppLayout.module.scss';

function AppLayout() {
    return (
        <div>
            <Header />
            <main className={styles['main-container']}>
                <Outlet />
            </main>
        </div>
    );
}

export default AppLayout;