import { useLocation, useOutlet } from "react-router";
import { Header } from "../../components/widgets/header";
import styles from './AppLayout.module.scss';
import { Footer } from "../../components/widgets/footer";
import { Drawer } from "../../components/widgets/drawer";
import { AnimatePresence, motion, type Variants } from "motion/react";

const pageVariants: Variants = {
    initial: {
        opacity: 0,
        scale: 0.9,
    },
    in: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.2,
            type: 'tween',
            ease: 'easeOut',
        },
    },
    out: {
        opacity: 0,
        scale: 0.9,
        transition: {
            duration: 0.1,
            type: 'tween',
            ease: 'easeIn',
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
                <main>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname} // Use location.pathname or location.key
                            variants={pageVariants}
                            initial="initial"
                            animate="in"
                            exit="out"
                            className="route-section" // For basic layout if needed
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