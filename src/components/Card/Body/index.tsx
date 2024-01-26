import React from 'react';

interface Props {
    text?: string;
    label?: string;
}

const Body: React.FC<Props> = ({label, text}) => {
    return (
        <p>
            <strong>{text ? `${label}:` : label}</strong>&nbsp;{text}
        </p>
    );
};

export default Body;
