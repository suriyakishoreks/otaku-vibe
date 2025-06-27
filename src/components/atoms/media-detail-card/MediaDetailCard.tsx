import { Link } from 'react-router';
import { Image } from '../image';
import { Label } from '../label';
import styles from './MediaDetailCard.module.scss';
import classNames from 'classnames';
import StarIcon from '../icons/StarIcon';
import HeartIcon from '../icons/HeartIcon';

interface MediaDetailCardProps {
    src: string;
    alt: string;
    navigateTo?: string;
    title?: string;
    summary?: string;
    ratings?: string;
    favorites?: string;
    status?: string;
    genres?: string[];
}

function MediaDetailCard({ src, alt, navigateTo, title, summary, ratings, favorites, status, genres }: MediaDetailCardProps) {
    const content = (
        <div className={classNames(styles['media-detail-card'], 'no-text-select', { [styles['media-detail-card__clickable']]: navigateTo })}>
            <div className={styles['media-detail-card__image-container']}>
                <div className={styles['media-detail-card__image-gradient']} />
                <Image src={src} alt={alt} className={styles['media-detail-card__image']} />
                {(!!ratings || !!favorites) && <div className={styles['media-detail-card__top-overlay']}>
                    {!!ratings && <div className={styles['media-detail-card__rating']}>
                        <StarIcon color='s-color-fg-primary' size={16} />
                        <Label as='p' font='typo-primary-s-semibold' >{ratings}</Label>
                    </div>}
                    {!!favorites && <div className={styles['media-detail-card__favorite']}>
                        <HeartIcon color='s-color-fg-primary' size={16} />
                        <Label as='p' font='typo-primary-s-semibold' >{favorites}</Label>
                    </div>}
                </div>}
            </div>
            <div className={styles['media-detail-card__content']}>
                <Label as='h4' font='typo-primary-l-medium' className={styles['media-detail-card__title']} >{title}</Label>
                {!!summary && <Label as='p' font='typo-primary-m-regular' className={styles['media-detail-card__summary']}>{summary}</Label>}
                {!!status && <Label as='p' font='typo-primary-m-regular' className={styles['media-detail-card__status']}>{status}</Label>}
                {!!genres && genres.length > 0 && <div className={styles['media-detail-card__genre']}>
                    {genres.map((value) => <Label key={value} as='p' font='typo-primary-m-regular' className={styles['media-detail-card__genre-item']}>{value}</Label>)}
                </div>}
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