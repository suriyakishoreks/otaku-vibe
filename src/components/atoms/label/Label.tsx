import React from 'react';
import type { Font, LabelRestrictedInlineStyle } from './Label.model';
import classNames from 'classnames';

type LabelProps<T extends React.ElementType> = {
    as?: T;
    children: React.ReactNode;
    font: Font;
    style?: LabelRestrictedInlineStyle;
} & Omit<React.ComponentPropsWithRef<T>, 'style'>;

const Label = <T extends React.ElementType = 'label'>({
    as,
    children,
    className,
    font,
    style,
    ...rest
}: LabelProps<T>) => {
    const Component = as ?? 'label';
    return <Component
        {...rest}
        className={classNames({
            [font]: font,
            [className]: className,
        })}
        style={style}
    >
        {children}
    </Component>;
};

export default Label;