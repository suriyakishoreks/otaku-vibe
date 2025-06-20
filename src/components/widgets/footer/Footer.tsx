import { Logo } from '../../atoms/logo';
import styles from './Footer.module.scss';
import { Label } from '../../atoms/label';
import Vernac from '../../../services/vernac';

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__content}>
                <div>
                    <Logo />
                </div>
                {/* //TODO */}
                <div className={styles.footer__socials}>
                    {/* Replace with actual icons/links */}
                    <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">🐦</a>
                    <a href="https://github.com" aria-label="GitHub" target="_blank" rel="noopener noreferrer">💻</a>
                </div>
            </div>
            <Label as='p' font='typo-primary-s-medium' className={styles['footer__copy-right']}>
                &copy; {new Date().getFullYear()} {Vernac.getVernac('en', 'COPY_RIGHT')}
            </Label>
        </footer>
    );
}

export default Footer;