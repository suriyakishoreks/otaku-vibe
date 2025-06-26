import { Link } from 'react-router';
import { Image } from '../image';
import { Label } from '../label';
import styles from './MediaDetailCard.module.scss';
import classNames from 'classnames';

interface MediaDetailCardProps {
    src: string;
    alt: string;
    navigateTo?: string;
    title?: string;
    summary?: string;
}

function MediaDetailCard({ src, alt, navigateTo, title, summary }: MediaDetailCardProps) {
    const content = (
        <div className={classNames(styles['media-detail-card'], 'no-text-select', { [styles['media-detail-card__clickable']]: navigateTo })}>
            <div className={styles['media-detail-card__image-container']}>
                <div className={styles['media-detail-card__image-gradient']} />
                <Image src={src} alt={alt} className={styles['media-detail-card__image']} />
            </div>
            <div className={styles['media-detail-card__content']}>
                <Label as='h4' font='typo-primary-l-medium' className={styles['media-detail-card__title']} >{title}</Label>
                <Label as='p' font='typo-primary-m-regular' className={styles['media-detail-card__summary']}>{summary}</Label>
            </div>
        </div>
    );

    return navigateTo ? (
        <Link to={navigateTo}>{content}</Link>
    ) : (
        content
    );
}

export function MediaDetailCardLoading() {
    return (
        <div className={classNames(styles['media-detail-card'])}>
            <div className={styles['media-detail-card__image-container']}>
                <div className={classNames(styles['media-detail-card__image'])} />
            </div>
            <div className={styles['media-detail-card__content']}>
            </div>
        </div>
    );
}

export default MediaDetailCard;