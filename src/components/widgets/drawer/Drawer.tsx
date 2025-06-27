import styles from './Drawer.module.scss';
import { useAppDispatch, useAppSelector } from '../../../store';
import { updateIsDrawerOpen } from '../../../store/slices/appContextSlice';
import { RemoveScroll } from 'react-remove-scroll';
import { AnimatePresence, motion } from 'motion/react';
import CloseIcon from '../../atoms/icons/CloseIcon';
import { Label } from '../../atoms/label';
import AnimeIcon from '../../atoms/icons/AnimeIcon';
import MangaIcon from '../../atoms/icons/MangaIcon';
import HomeIcon from '../../atoms/icons/HomeIcon';
import { Link, useLocation } from 'react-router';
import Vernac from '../../../services/vernac';
import { Pill } from '../../atoms/pill';
import { ThemeToggle } from '../../atoms/theme-toggle';


const drawerVariants = {
    hidden: { x: '100%' },
    visible: { x: '0%', transition: { type: "tween" as const, duration: 0.3 } },
    exit: { x: '100%', transition: { type: "tween" as const, duration: 0.3 } },
};

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
};

function Drawer() {
    const location = useLocation();
    const isDrawerOpen = useAppSelector((state) => state.appContext.isDrawerOpen);
    const isHeaderNavHidden = useAppSelector((state) => state.appContext.isHeaderNavHidden);
    const dispatch = useAppDispatch();

    const handleDrawerClose = () => {
        dispatch(updateIsDrawerOpen(false));
    };

    return (
        <AnimatePresence>
            {isDrawerOpen && (
                <>
                    <motion.div
                        className={styles.drawer}
                        onClick={handleDrawerClose}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={backdropVariants}
                    >
                    </motion.div>
                    <RemoveScroll enabled={isDrawerOpen}>
                        <motion.aside
                            className={styles['drawer__content']}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={drawerVariants}
                        >
                            <div className={styles.drawer__close}>
                                <button onClick={handleDrawerClose} className={styles['drawer__close-button']}>
                                    <CloseIcon size={28} color='s-color-fg-primary' />
                                </button>
                            </div>
                            {isHeaderNavHidden && <div className={styles['drawer__menu-group']}>
                                <Label className={styles['drawer__menu-heading']} font='typo-primary-l-medium'>Explore</Label>
                                <nav className={styles.drawer__nav}>
                                    <Link onClick={handleDrawerClose} to='/' >
                                        <Pill icon={HomeIcon} text={Vernac.getVernac('HOME')} active={location.pathname === '/'} />
                                    </Link>
                                    <Link onClick={handleDrawerClose} to='/anime'>
                                        <Pill icon={AnimeIcon} text={Vernac.getVernac('ANIME')} active={location.pathname === '/anime'} />
                                    </Link>
                                    <Link onClick={handleDrawerClose} to='/manga'>
                                        <Pill icon={MangaIcon} text={Vernac.getVernac('MANGA')} active={location.pathname === '/manga'} />
                                    </Link>
                                </nav>
                            </div>}
                            <div className={styles['drawer__menu-group']}>
                                <Label className={styles['drawer__menu-heading']} font='typo-primary-l-medium'>Settings</Label>
                                <div>
                                    <ThemeToggle />
                                </div>
                            </div>
                        </motion.aside>
                    </RemoveScroll>
                </>
            )}
        </AnimatePresence>
    );
}

export default Drawer;