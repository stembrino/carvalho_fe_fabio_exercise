import styled, {css} from 'styled-components';

export type VariantSizes = 'small' | 'medium' | 'large';

interface InputSearchProps {
    width?: number;
    size?: VariantSizes;
}

const variantSize = (size: VariantSizes) => {
    switch (size) {
        case 'small':
            return css`
                font-size: 14px;
                height: 36px;
                width: 256px;
            `;
        case 'medium':
            return css`
                font-size: 16px;
                height: 44px;
                width: 320px;
            `;
        default:
            return css`
                font-size: 20px;
                height: 56px;
                width: 488px;
            `;
    }
};

export const InputSearch = styled.input<InputSearchProps>`
    position: relative;
    border-radius: 40px;
    border: 1px solid #6f6f6f;
    font-size: 16px;
    padding-inline: 16px;
    padding-block: 5px;
    box-sizing: border-box;
    ${({size}) => variantSize(size)}
    &:focus {
        outline: 1px solid black;
    }
`;
