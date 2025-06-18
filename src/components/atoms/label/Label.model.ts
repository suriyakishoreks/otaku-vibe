import type { CSSProperties } from "react";

export type LabelRestrictedInlineStyle = Omit<
    CSSProperties,
    'fontFamily' | 'fontSize' | 'fontWeight'
>;

export type ValidLabelElement = 'label' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';