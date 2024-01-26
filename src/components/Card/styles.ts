import styled, {css} from 'styled-components';

const navStyles = css`
    position: relative;
    cursor: pointer;
    transition: box-shadow 0.1ms ease-in-out;
    &:hover {
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
        &::before {
            content: '';
            position: absolute;
            inset: 0;
            background-color: #79797933;
        }
    }
`;

export const CardButton = styled.button<{$hasNavigation: boolean}>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid black;
    background: #ddd;
    padding: 20px;
    width: 250px;
    max-height: 200px;
    margin: 5px;
    ${({$hasNavigation}) => $hasNavigation && navStyles}
`;
