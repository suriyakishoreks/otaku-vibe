import { useSearchParams } from 'react-router';
import { Dropdown, type DropdownOption } from '../../atoms/dropdown';
import SearchIcon from '../../atoms/icons/SearchIcon';
import styles from './SearchOptions.module.scss';
import { SearchCategoryOptions } from '../../../services/jikan/constants';

export interface SearchOption {
    queryKey: string;
    type?: 'single' | 'multi';
    options: { id: string, title: string, nsfw?: boolean; }[];
    placeholder?: string;
}

interface SearchOptionsProps {
    options: SearchOption[];
    searchQueryKey: string;
    searchCategory: string;
}

function SearchOptions({ options, searchQueryKey, searchCategory }: SearchOptionsProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleMultiSelect = (queryKey: string, option: { id: string, title: string; }) => {
        setSearchParams((prev: URLSearchParams) => {
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
        setSearchParams((prev: URLSearchParams) => {
            const newParams = new URLSearchParams(prev);
            if (option?.id) {
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
        setSearchParams((prev: URLSearchParams) => {
            const newParams = new URLSearchParams(prev);
            if (value) {
                newParams.set(searchQueryKey, value);
            } else {
                newParams.delete(searchQueryKey);
            }
            newParams.set('page', '1');
            return newParams;
        }, { replace: true });
    };

    const handleCategoryChange = (newCategory?: DropdownOption) => {
        setSearchParams((prev: URLSearchParams) => {
            const newParams = new URLSearchParams();
            newParams.set('category', newCategory?.id ?? 'anime');
            const q = prev.get('q');
            if (q) {
                newParams.set('q', q);
            }
            return newParams;
        }, { replace: true });
    };

    return (
        <div className={styles.search}>
            <div className={styles['search__top-container']}>
                <div className={styles['search__category']}>
                    <Dropdown
                        options={SearchCategoryOptions}
                        selectedOptions={SearchCategoryOptions.filter((option) => option.id === searchCategory)}
                        onSelect={handleCategoryChange}
                    />
                </div>
                <div className={styles['search__bar']}>
                    <SearchIcon size={20} color="s-color-fg-primary" />
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchParams.get(searchQueryKey) ?? ''}
                        onChange={handleSearchChange}
                        className={'typo-primary-m-medium'}
                    />
                </div>
            </div>
            <div className={styles['search__bottom-container']}>
                {options.map((option) => {
                    const selectedIds = searchParams.get(option.queryKey)?.split(',') ?? [];
                    const selectedOptions = option.options.filter(o => selectedIds.includes(o.id));

                    return (
                        <Dropdown
                            key={option.queryKey}
                            placeholder={option.placeholder ?? option.queryKey.replace(/_/g, ' ')}
                            options={option.options}
                            selectedOptions={selectedOptions}
                            onSelect={(selected) => option.type === 'multi'
                                ? handleMultiSelect(option.queryKey, selected)
                                : handleSingleSelect(option.queryKey, selected)
                            }
                            isMulti={option.type === 'multi'}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default SearchOptions;