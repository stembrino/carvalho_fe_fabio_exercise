import React, {ChangeEvent} from 'react';
import {InputSearch, VariantSizes} from './styles';

interface Props {
    value: string;
    name?: string;
    placeholder?: string;
    size?: VariantSizes;
    onChange: (value: string) => void;
}

const SearchBar: React.FC<Props> = ({
    value = '',
    name,
    placeholder = '',
    size = 'medium',
    onChange,
}) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <InputSearch
            onChange={handleChange}
            type="text"
            placeholder={placeholder}
            id="search-input"
            aria-label="Search"
            name={name}
            value={value}
            size={size}
        />
    );
};

export default SearchBar;
