import type { IconProps } from './icon.model';
import { cssColorVar } from '../../../shared/design-system/util';

function MenuIcon({ size, color }: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 -960 960 960" width={size} fill={cssColorVar(color)}><path d="M120-240v-80h520v80H120Zm664-40L584-480l200-200 56 56-144 144 144 144-56 56ZM120-440v-80h400v80H120Zm0-200v-80h520v80H120Z" /></svg>);
}

export default MenuIcon;