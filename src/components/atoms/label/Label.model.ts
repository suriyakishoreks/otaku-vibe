import type { CSSProperties } from "react";

export type Font = 'typo-primary-s-regular' | 'typo-primary-s-medium' | 'typo-primary-s-semibold' |
    'typo-primary-m-regular' | 'typo-primary-m-medium' | 'typo-primary-m-semibold' |
    'typo-primary-l-regular' | 'typo-primary-l-medium' | 'typo-primary-l-semibold';

export type LabelRestrictedInlineStyle = Omit<
    CSSProperties,
    'fontFamily' | 'fontSize' | 'fontWeight'
>;