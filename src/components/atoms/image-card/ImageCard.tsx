import { Link } from 'react-router';
import { Image } from '../image';
import { Label } from '../label';
import styles from './ImageCard.module.scss';
import classNames from 'classnames';

interface ImageCardProps {
    src: string;
    alt: string;
    navigateTo?: string;
    title?: string;
}

function ImageCard({ src, alt, navigateTo, title }: ImageCardProps) {
    const content = (
        <div className={classNames({ [styles['image-card']]: true, [styles['image-card__clickable']]: navigateTo, 'no-text-select': true })}>
            <Image src={src} alt={alt} className={styles['image-card__image']} />
            {title && <div className={styles['image-card__bottom-overlay']}>
                <Label as='h4' font='typo-primary-m-medium' className={styles['image-card__title']} >{title}</Label>
            </div>}
        </div>
    );

    return navigateTo ? (
        <Link to={navigateTo}>{content}</Link>
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