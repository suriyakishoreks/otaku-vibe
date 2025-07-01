import { AnimatedLogo } from '../../components/atoms/animated-logo';
import { motion, type Variants } from "motion/react";
import styles from './Loader.module.scss';

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

function Loader() {
    return (
        <motion.div
            key={"page-loader"}
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            className={styles.loader}
        >
            <AnimatedLogo />
        </motion.div>
    );
}

export default Loader;