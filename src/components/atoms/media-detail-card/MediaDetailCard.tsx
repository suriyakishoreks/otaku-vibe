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
        <div className={classNames({ [styles['media-detail-card']]: true, [styles['media-detail-card__clickable']]: navigateTo, 'no-text-select': true })}>
            <div className={styles['media-detail-card__content']}>
                <Label as='h4' font='typo-primary-l-medium' className={styles['media-detail-card__title']} >{title}</Label>
                <Label as='p' font='typo-primary-m-regular' className={styles['media-detail-card__summary']}>{summary}</Label>
            </div>
            <Image src={src} alt={alt} className={styles['media-detail-card__image']} />
        </div>
    );

    return navigateTo ? (
        <Link to={navigateTo}>{content}</Link>
    ) : (
        content
    );
}

export default MediaDetailCard;