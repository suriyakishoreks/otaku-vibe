import { Link } from 'react-router';
import { Image } from '../image';
import { Label } from '../label';
import styles from './ImageCard.module.scss';
import classNames from 'classnames';
import StarIcon from '../icons/StarIcon';
import HeartIcon from '../icons/HeartIcon';

interface ImageCardProps {
    src: string;
    alt: string;
    navigateTo?: string;
    title?: string;
    ratings?: string;
    favorites?: string;
}

function ImageCard({ src, alt, navigateTo, title, ratings, favorites }: ImageCardProps) {
    const content = (
        <div className={classNames({ [styles['image-card']]: true, [styles['image-card__clickable']]: navigateTo, 'no-text-select': true })}>
            <Image src={src} alt={alt} className={styles['image-card__image']} />
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

export function ImageCardLoading() {
    return (
        <div className={classNames(styles['image-card'], styles['image-card--loading'])}>
            <div className={styles['image-card__image']} />
        </div>
    );
}

export default ImageCard;