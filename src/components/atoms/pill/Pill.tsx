import type { IconProps } from "../icons/icon.model";
import { Label } from "../label";
import styles from "./Pill.module.scss";

interface PillProps {
    icon: React.ComponentType<IconProps>;
    text: string;
}

function Pill({ icon: Icon, text }: PillProps) {
    return (
        <div className={styles.pill}>
            <Icon size={20} color={'s-color-fg-primary'} />
            <Label as='h2' font='typo-primary-m-medium' className={styles.pill__text}>{text}</Label>
        </div>
    );
}

export default Pill;