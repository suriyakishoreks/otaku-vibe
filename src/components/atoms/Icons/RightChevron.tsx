import type { IconProps } from './icon.model';
import { cssColorVar } from '../../../shared/design-system/util';

function RightChevron({ size, color }: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 -960 960 960" width={size} fill={cssColorVar(color)}><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" /></svg>);
}

export default RightChevron;