import type { IconProps } from "../atoms/icons/icon.model";
import styles from "./Pill.module.scss";

interface PillProps {
    icon: React.ComponentType<IconProps>;
    labelColor?: string;
    fillColor?: string;
}

function Pill({ icon: Icon, labelColor, fillColor }: PillProps) {
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
            <Icon size={24} color={labelColor ?? '#FFFFFF'} />
            <span style={{ color: labelColor ?? '#FFFFFF' }}>Label</span>
        </div>
    );
}

export default Pill;