import styled from 'styled-components';

interface InputSearchProps {
    width?: number;
  }

export const InputSearch = styled.input<InputSearchProps>`
    border: 2px solid black;
    border-radius: 12px;
    padding-inline: 16px;
    padding-block: 5px;
    font-size: 16px;
    box-sizing: border-box;
    width: ${({width}) => `${width}px` || 'initial'};
`; 