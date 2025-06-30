import { Link } from 'react-router';
import { Image } from '../image';
import { Label } from '../label';
import styles from './ImageCard.module.scss';
import classNames from 'classnames';
import StarIcon from '../ic/StarIcon';
import HeartIcon from '../ic/HeartIcon';

interface ImageCardProps {
    src: string;
    alt: string;
    navigateTo?: string;
    title?: string;
    ratings?: string;
    favorites?: string;
    grid?: boolean;
}

function ImageCard({ src, alt, navigateTo, title, ratings, favorites, grid }: ImageCardProps) {
    const content = (
        <div className={classNames({ [styles['image-card']]: true, [styles['image-card__clickable']]: navigateTo, 'no-text-select': true, [styles['image-card--grid']]: grid })}>
            <Image src={src} alt={alt} className={classNames(styles['image-card__image'], { [styles['image-card__image--grid']]: grid })} />
            {(!!ratings || !!favorites) && <div className={styles['image-card__top-overlay']}>
                {!!ratings && <div className={styles['image-card__rating']}>
                    <StarIcon color='s-color-fg-primary' size={16} />
                    <Label as='p' font='typo-primary-s-semibold' >{ratings}</Label>
                </div>}
                {!!favorites && <div className={styles['image-card__favorite']}>
                    <HeartIcon color='s-color-fg-primary' size={16} />
                    <Label as='p' font='typo-primary-s-semibold' >{favorites}</Label>
                </div>}
            </div>}
            {!!title && <div className={styles['image-card__bottom-overlay']}>
                <Label as='h4' font='typo-primary-m-medium' className={styles['image-card__title']} >{title}</Label>
            </div>}
        </div>
    );

    return navigateTo ? (
        <Link to={navigateTo} >{content}</Link>
    ) : (
        content
    );
}

export function ImageCardLoading({ grid }: { grid?: boolean; }) {
    return (
        <div className={classNames(styles['image-card'], styles['image-card--loading'], { [styles['image-card--grid']]: grid })}>
            <div className={classNames(styles['image-card__image'], { [styles['image-card__image--grid']]: grid })} />
        </div>
    );
}

export default ImageCard;