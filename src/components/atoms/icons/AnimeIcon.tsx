import type { IconProps } from './icon.model';
import { cssColorVar } from '../../../shared/design-system/util';

function AnimeIcon({ size, color }: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 24 24" width={size} fill={cssColorVar(color)}><path d="M0 0h24v24H0z" fill="none" /><path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" /></svg>);
}

export default AnimeIcon;