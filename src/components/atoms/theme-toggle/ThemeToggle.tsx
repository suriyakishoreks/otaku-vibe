import styles from './ThemeToggle.module.scss';
import { useAppSelector } from '../../../store';
import { useDispatch } from 'react-redux';
import { updateTheme } from '../../../store/slices/persistedAppContext';
import { Label } from '../label';
import MoonIcon from '../icons/MoonIcon';
import SunIcon from '../icons/SunIcon';
import classNames from 'classnames';

function ThemeToggle() {

    const theme = useAppSelector((state) => state.persistedAppContext.theme);
    const dispatch = useDispatch();

    const handleThemeToggle = () => {
        dispatch(updateTheme(theme === 'light' ? 'dark' : 'light'));
    };

    return (
        <div className={styles['theme-toggle']}>
            <Label as='span' font='typo-primary-m-medium'>Theme</Label>
            <MoonIcon size={24} color='s-color-fg-primary' />
            <button
                className={styles['theme-toggle__button']}
                onClick={handleThemeToggle}
            >
                <div className={classNames(styles['theme-toggle__circle'], { [styles['theme-toggle__circle--light']]: theme === 'light' })} />
            </button>
            <SunIcon size={24} color='s-color-fg-primary' />
        </div>

    );
}

export default ThemeToggle;