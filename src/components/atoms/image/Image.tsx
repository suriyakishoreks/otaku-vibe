import classNames from 'classnames';
import { type ImgHTMLAttributes } from 'react';
import styles from './Image.module.scss';

type ImageProps = ImgHTMLAttributes<HTMLImageElement>;

function Image(props: ImageProps) {

    return (
        <img
            {...props}
            loading="lazy"
            className={classNames({
                [props.className ?? '']: true,
                [styles.image]: true,
            })}
        />
    );
}

export default Image;
