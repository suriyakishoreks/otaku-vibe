export interface SearchOption {
    queryKey: string;
    type?: 'single' | 'multi';
    options: { id: string, title: string, nsfw?: boolean; }[];
}

interface SearchOptionsProps {
    options: SearchOption[];
    searchQueryKey: string;
}

function SearchOptions({ options }: SearchOptionsProps) {

    return (
        <div>
            {options.map((option) => <select>
                {option.options.map(g => (
                    <option key={g.id} value={g.id}>{g.title}</option>
                ))}
            </select>)}
        </div>
    );
}

export default SearchOptions;