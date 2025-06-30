import { useState, useRef } from 'react';
import styles from './Dropdown.module.scss';
import CloseIcon from '../icons/CloseIcon';
import DownChevron from '../icons/DownChevron';
import { useOutsideClick } from '../../../shared/hooks/useOutsideClick';
import { Label } from '../label';

export interface DropdownOption {
    id: string;
    title: string;
}

interface DropdownProps {
    options: DropdownOption[];
    selectedOptions: DropdownOption[];
    onSelect: (option?: DropdownOption) => void;
    placeholder?: string;
    isMulti?: boolean;
}

function Dropdown({ options, selectedOptions, onSelect, placeholder, isMulti = false }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useOutsideClick(dropdownRef as React.RefObject<HTMLElement>, () => {
        if (isOpen) {
            setIsOpen(false);
        }
    });

    const handleSelect = (option: DropdownOption) => {
        onSelect(option);
        if (!isMulti) {
            setIsOpen(false);
        }
    };

    const handleClearSingle = (e: React.MouseEvent) => {
        e.stopPropagation();
        onSelect();
    };

    const isSelected = (option: DropdownOption) => {
        return selectedOptions.some(selected => selected.id === option.id);
    };

    const dropDownText = `${placeholder ? placeholder : ''}${placeholder && selectedOptions.length > 0 ? ': ' : ''}${selectedOptions.length > 0 ? selectedOptions[0].title : ''}`;

    return (
        <div className={styles.dropdown} ref={dropdownRef}>
            <div className={styles['dropdown__header']} onClick={() => setIsOpen(!isOpen)}>
                <Label as='p' font='typo-primary-m-medium' className={styles['dropdown__text']} >{dropDownText}</Label>
                <button className={styles['dropdown__clear-btn']} onClick={handleClearSingle}>
                    <CloseIcon size={16} color="s-color-fg-primary" />
                </button>
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