import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import SearchBar from '..';

describe('SearchBar', () => {
    it('should renders with the provided value and placeholder', () => {
         render(<SearchBar value="Test Value" placeholder="Search..." onChange={() => {}} />);
        const inputElement = screen.getByPlaceholderText('Search...');
        
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveValue('Test Value');
      });
    
    it('should calls onChange handler when input value changes', () => {
        const onChangeMock = jest.fn();
        render(<SearchBar value="" placeholder="Search..." onChange={onChangeMock} />);
        const inputElement = screen.getByPlaceholderText('Search...');

        fireEvent.change(inputElement, {target: {value: 'New Value'}});

        expect(onChangeMock).toHaveBeenCalledWith('New Value');
    });
});