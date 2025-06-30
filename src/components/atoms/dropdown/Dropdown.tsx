import { useState, useRef, useEffect } from 'react';
import styles from './Dropdown.module.scss';
import CloseIcon from '../ic/CloseIcon';
import DownChevron from '../ic/DownChevron';
import { useOutsideClick } from '../../../shared/hooks/useOutsideClick';
import { Label } from '../label';

export interface DropdownOption {
    id: string;
    title: string;
}

interface DropdownProps {
    options: DropdownOption[];
    selectedOptions: DropdownOption[];
    onSelect: (option: DropdownOption) => void;
    onClear?: () => void;
    placeholder?: string;
    defaultOption?: string;
    isMulti?: boolean;
}

function Dropdown({ options, selectedOptions, onSelect, placeholder, isMulti = false, onClear, defaultOption }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useOutsideClick(dropdownRef as React.RefObject<HTMLElement>, () => {
        if (isOpen) {
            setIsOpen(false);
        }
    });

    useEffect(() => {
        if (selectedOptions.length === 0 && defaultOption) {
            const foundOption = options.find(option => option.id === defaultOption);
            if (foundOption) {
                onSelect(foundOption);
            }
        }
    }, [selectedOptions, defaultOption, onSelect, options]);

    const handleSelect = (option: DropdownOption) => {
        onSelect(option);
        if (!isMulti) {
            setIsOpen(false);
        }
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        onClear?.();
    };

    const isSelected = (option: DropdownOption) => {
        return selectedOptions.some(selected => selected.id === option.id);
    };

    const dropDownText = `${placeholder ? placeholder : ''}${placeholder && selectedOptions.length > 0 ? ': ' : ''}${selectedOptions.length > 0 ? selectedOptions.reduce((accumulator, currentValue, index) => {
        if (index === 0) {
            return currentValue.title;
        } else {
            return accumulator + ", " + currentValue.title;
        }
    }, "") : ''}`;

    return (
        <div className={styles.dropdown} ref={dropdownRef}>
            <div className={styles['dropdown__header']} onClick={() => setIsOpen(!isOpen)}>
                <Label as='p' font='typo-primary-m-medium' className={styles['dropdown__text']} >{dropDownText}</Label>
                {!!onClear && selectedOptions.length > 0 && <button className={styles['dropdown__clear-btn']} onClick={handleClear}>
                    <CloseIcon size={16} color="s-color-fg-primary" />
                </button>}
                <DownChevron size={20} color="s-color-fg-primary" className={styles['dropdown__down-chevron']} />
            </div>
            {isOpen && (
                <ul className={styles['dropdown__list']}>
                    {options.map(option => (
                        <li
                            key={option.id}
                            className={`${styles['dropdown__list-item']} ${isSelected(option) ? styles['dropdown__list-item--selected'] : ''}`}
                            onClick={() => handleSelect(option)}
                        >
                            {option.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Dropdown;