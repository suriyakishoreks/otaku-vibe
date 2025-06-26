import type { IconProps } from './icon.model';
import { cssColorVar } from '../../../shared/design-system/util';

function CloseIcon({ size, color, className }: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} height={size} viewBox="0 -960 960 960" width={size} fill={cssColorVar(color)}><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>);
}

export default CloseIcon;