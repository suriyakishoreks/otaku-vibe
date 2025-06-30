import classNames from "classnames";
import type { IconProps } from "../ic/icon.model";
import { Label } from "../label";
import styles from "./Pill.module.scss";

interface PillProps {
    icon: React.ComponentType<IconProps>;
    text: string;
    active?: boolean;
}

function Pill({ icon: Icon, text, active }: PillProps) {
    return (
        <div className={classNames({ [styles.pill]: true, [styles['pill--active']]: active })}>
            <Icon size={20} color={active ? 's-color-bg-secondary' : 's-color-fg-primary'} />
            <Label as='h2' font='typo-primary-m-medium' className={classNames({ [styles.pill__text]: true, [styles['pill__text--active']]: active })}>{text}</Label>
        </div>
    );
}

export default Pill;