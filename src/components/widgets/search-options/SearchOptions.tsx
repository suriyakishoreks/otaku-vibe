import { useSearchParams } from 'react-router';
import { Dropdown, type DropdownOption } from '../../atoms/dropdown';
import SearchIcon from '../../atoms/ic/SearchIcon';
import styles from './SearchOptions.module.scss';
import { SearchCategoryOptions } from '../../../services/jikan/constants';
import { useEffect, useState } from 'react';
import { Label } from '../../atoms/label';


export interface SearchOption {
    queryKey: string;
    type?: 'single' | 'multi';
    options: { id: string, title: string, nsfw?: boolean; }[];
    placeholder?: string;
    default?: string;
}

interface SearchOptionsProps {
    options: SearchOption[];
    searchQueryKey: string;
    searchCategory: string;
}

function SearchOptions({ options, searchQueryKey, searchCategory }: SearchOptionsProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [internalSearchParams, setInternalSearchParams] = useState(new URLSearchParams(searchParams));

    useEffect(() => {
        setInternalSearchParams(new URLSearchParams(searchParams));
    }, [searchParams]);

    const handleMultiSelect = (queryKey: string, option: { id: string, title: string; }) => {
        setInternalSearchParams((prev: URLSearchParams) => {
            const newParams = new URLSearchParams(prev);
            const existing = newParams.get(queryKey)?.split(',') ?? [];
            const newValues = existing.includes(option.id)
                ? existing.filter(item => item !== option.id)
                : [...existing, option.id];

            if (newValues.length) {
                newParams.set(queryKey, newValues.join(','));
            } else {
                newParams.delete(queryKey);
            }
            newParams.set('page', '1');
            return newParams;
        });
    };

    const handleSingleSelect = (queryKey: string, option: { id: string, title: string; }) => {
        setInternalSearchParams((prev: URLSearchParams) => {
            const newParams = new URLSearchParams(prev);
            if (option.id) {
                newParams.set(queryKey, option.id);
            } else {
                newParams.delete(queryKey);
            }
            newParams.set('page', '1');
            return newParams;
        });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInternalSearchParams((prev: URLSearchParams) => {
            const newParams = new URLSearchParams(prev);
            if (value) {
                newParams.set(searchQueryKey, value);
            } else {
                newParams.delete(searchQueryKey);
            }
            newParams.set('page', '1');
            return newParams;
        });
    };

    const handleCategoryChange = (newCategory: DropdownOption) => {
        setSearchParams((prev: URLSearchParams) => {
            const newParams = new URLSearchParams();
            newParams.set('category', newCategory?.id ?? searchCategory);
            const q = prev.get(searchQueryKey) ?? internalSearchParams.get(searchQueryKey);
            if (q) {
                newParams.set(searchQueryKey, q);
            }
            newParams.set('page', '1');
            return newParams;
        }, { replace: true });
    };

    const handleOptionClear = (queryKey: string) => {
        setInternalSearchParams((prev: URLSearchParams) => {
            const newParams = new URLSearchParams(prev);
            newParams.delete(queryKey);
            newParams.set('page', '1');
            return newParams;
        });
    };

    const handleSearch = () => {
        setSearchParams(new URLSearchParams(internalSearchParams), { replace: true });
    };

    return (
        <div className={styles.search}>
            <div className={styles['search__top-container']}>
                <div className={styles['search__category']}>
                    <Dropdown
                        options={SearchCategoryOptions}
                        selectedOptions={SearchCategoryOptions.filter((option) => option.id === searchParams.get('category'))}
                        onSelect={handleCategoryChange}
                        defaultOption={searchCategory}
                    />
                </div>
                <div className={styles['search__bar']}>
                    <SearchIcon size={20} color="s-color-fg-primary" />
                    <input
                        type="text"
                        placeholder="Find what you're looking for..."
                        value={internalSearchParams.get(searchQueryKey) ?? ''}
                        onChange={handleSearchChange}
                        className={'typo-primary-m-medium'}
                    />
                </div>
            </div>
            <div className={styles['search__bottom-container']}>
                {options.map((option) => {
                    const selectedIds = internalSearchParams.get(option.queryKey)?.split(',') ?? [];
                    const selectedOptions = option.options.filter(o => selectedIds.includes(o.id));

                    return (
                        <Dropdown
                            key={option.queryKey}
                            placeholder={option.placeholder}
                            options={option.options}
                            selectedOptions={selectedOptions}
                            onSelect={(selected) => option.type === 'multi'
                                ? handleMultiSelect(option.queryKey, selected)
                                : handleSingleSelect(option.queryKey, selected)
                            }
                            isMulti={option.type === 'multi'}
                            defaultOption={option.default}
                            onClear={!option.default ? () => handleOptionClear(option.queryKey) : undefined}
                        />
                    );
                })}
            </div>
            <div className={styles['search__button-container']}>
                <button onClick={handleSearch} className={styles['search__button']}>
                    <SearchIcon size={24} color='s-color-fg-primary' />
                    <Label as='p' font='typo-primary-l-medium'>Search</Label>
                </button>
            </div>
        </div>
    );
}

export default SearchOptions;