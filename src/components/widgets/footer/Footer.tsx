import styles from './Footer.module.scss';
import { Label } from '../../atoms/label';
import Vernac from '../../../services/vernac';
import GithubIcon from '../../atoms/icons/GithubIcon';
import { Link } from 'react-router';
import MailIcon from '../../atoms/icons/MailIcon';

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__content}>
                <div className={styles.footer__description}>
                    <Label as="p" font="typo-primary-m-regular">
                        {Vernac.getVernac('APP_DESC')}
                    </Label>
                </div>
                <nav className={styles.footer__socials}>
                    <Link to='https://github.com/suriyakishoreks' target="_blank" rel="noopener noreferrer" >
                        <GithubIcon size={24} color='s-color-fg-primary' className={styles['footer__actions']} />
                    </Link>
                    <Link to='mailto:kssuriyakishore16@gmail.com' target="_blank" rel="noopener noreferrer" >
                        <MailIcon size={24} color='s-color-fg-primary' className={styles['footer__actions']} />
                    </Link>
                </nav>
            </div>
            <Label as='p' font='typo-primary-s-medium' className={styles['footer__copy-right']}>
                &copy; {new Date().getFullYear()} {Vernac.getVernac('COPY_RIGHT')}
            </Label>
        </footer>
    );
}

export default Footer;