import { useLocation, useOutlet } from "react-router";
import { Header } from "../../components/widgets/header";
import styles from './AppLayout.module.scss';
import { Footer } from "../../components/widgets/footer";
import { Drawer } from "../../components/widgets/drawer";
import { AnimatePresence, motion, type Variants } from "motion/react";

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
        x: 20,
        transition: {
            duration: 0.3,
            ease: "easeIn",
        },
    },
};

function AppLayout() {
    const location = useLocation();
    const outlet = useOutlet();

    return (
        <div className={styles['app-layout']}>
            <Drawer />
            <div>
                <Header />
                <main className={styles['app-layout__content']}>
                    <AnimatePresence mode="wait" onExitComplete={() => {
                        // TODO: proper scroll restoration impl
                        window.scrollTo(0, 0);
                    }}>
                        <motion.div
                            key={location.pathname} // Use location.pathname or location.key
                            variants={pageVariants}
                            initial="initial"
                            animate="in"
                            exit="out"
                        // style={{ position: 'absolute', width: '100%' }} // Helps with overlapping for transitions
                        >
                            {outlet}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default AppLayout;