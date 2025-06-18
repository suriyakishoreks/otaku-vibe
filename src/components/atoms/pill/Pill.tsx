import type { SemanticColors } from "../../../shared/design-system/model";
import type { IconProps } from "../icons/icon.model";
import { Label } from "../label";
import styles from "./Pill.module.scss";

interface PillProps {
    icon: React.ComponentType<IconProps>;
    text: string;
    labelColor?: SemanticColors;
    fillColor?: string;
}

function Pill({ icon: Icon, labelColor, fillColor, text }: PillProps) {
    return (
        <div
            className={styles.pill}
            style={{
                backgroundColor: fillColor ?? '#007BFF',
                padding: '8px 12px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}
        >
            <Icon size={24} color={labelColor ?? 's-color-fg-primary'} />
            <Label as='h2' font='typo-primary-l-semibold' className={styles.pill}>{text}</Label>
        </div>
    );
}

export default Pill;