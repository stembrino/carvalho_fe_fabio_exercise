import styled, {css} from 'styled-components';

const navStyles = css`
    cursor: pointer;
    &:hover {
        background-color: #f7f7f7;
        outline: 1px solid black;
    }
`;

export const CardButton = styled.button<{$hasNavigation: boolean}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    background: #ddd;
    padding: 20px;
    width: 250px;
    max-height: 200px;
    margin: 5px;
    ${({$hasNavigation}) => $hasNavigation && navStyles}
`;
