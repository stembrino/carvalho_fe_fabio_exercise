import React, {ChangeEvent} from 'react';
import {InputSearch} from './styles';

interface Props {
    value: string,
    name?: string,
    placeholder?: string,
    width?: number,
    onChange: (value: string) => void
}

const SearchBar: React.FC<Props> = ({value = '',name, placeholder = '', width, onChange}) => {

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value); 
    };

    return (
        <InputSearch onChange={handleChange} type="text" placeholder={placeholder} id="search-input" name={name} value={value} width={width} />
    );
};

export default SearchBar;