import { ScrollRestoration, useLocation, useOutlet } from "react-router";
import { Header } from "../../components/widgets/header";
import styles from './AppLayout.module.scss';
import { Footer } from "../../components/widgets/footer";
import { Drawer } from "../../components/widgets/drawer";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { Suspense } from "react";
import { Loader } from "../loader";

const pageVariants: Variants = {
    initial: {
        opacity: 0,
        x: -20,
    },
    in: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut",
        },
    },
    out: {
        opacity: 0,
        transition: {
            duration: 0, ease: "easeIn"
        },
    },
};

function AppLayout() {
    const location = useLocation();
    const outlet = useOutlet();

    return (
        <div className={styles['app-layout']}>
            <Drawer />
            <Header />
            <main className={styles['app-layout__content']}>
                <ScrollRestoration />
                <AnimatePresence mode="sync">
                    <Suspense key={location.key} fallback={<Loader />}>
                        <motion.div
                            key={location.pathname}
                            variants={pageVariants}
                            initial="initial"
                            animate="in"
                            exit="out"
                        >
                            {outlet}
                        </motion.div>
                    </Suspense>
                </AnimatePresence>
            </main>
            <Footer />
        </div>
    );
}

export default AppLayout;