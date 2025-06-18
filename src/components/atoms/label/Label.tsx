import React from 'react';
import type { Font, LabelRestrictedInlineStyle } from './Label.model';
import classNames from 'classnames';

// TODO: Restrict the as prop type even further to valid label elements
type LabelProps<T extends React.ElementType = 'span'> = {
    as?: T;
    children: React.ReactNode;
    font: Font;
    style?: LabelRestrictedInlineStyle;
} & Omit<React.ComponentPropsWithRef<T>, 'style'>;

const Label = <T extends React.ElementType = 'span'>({
    as,
    children,
    className,
    font,
    style,
    ...rest
}: LabelProps<T>) => {
    const Component = as ?? 'span';
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