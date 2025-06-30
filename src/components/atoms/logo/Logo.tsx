import LogoIcon from "../icons/LogoIcon";
import { Label } from "../label";
import Vernac from "../../../services/vernac";
import styles from './Logo.module.scss';

interface LogoProps {
    hideName?: boolean;
}

function Logo({ hideName }: LogoProps) {
    return (
        <div className={styles.logo}>
            <LogoIcon size={48} color={'s-color-fg-primary'} />
            {!hideName && <Label as='h1' font='typo-primary-xl-medium' className={styles['logo__title']} >
                {Vernac.getVernac('APP_NAME')}
            </Label>}
        </div>
    );
}

export default Logo;