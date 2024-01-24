import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import {Teams, UserData} from 'types';
import {Container} from './styles';

interface Props {
    id?: string;
    url?: string;
    columns: Array<{
        key: string;
        value: string;
    }>;
    hasNavigation?: boolean;
    navigationProps?: UserData | Teams;
}

const Card: React.FC<Props> = ({
    id,
    columns,
    url,
    hasNavigation = true,
    navigationProps = null,
}) => {
    const navigate = useNavigate();

    const handleClick = (e: Event) => {
        if (!hasNavigation) {return;} 
        e.preventDefault();
        navigate(url, {
           state: navigationProps,
        });
    };

    return (
        <Container
            data-testid={`cardContainer-${id}`}
            hasNavigation={hasNavigation}
            onClick={handleClick}
        >
            {columns.map(({key: columnKey, value}) => (
                <p key={columnKey}>
                    <strong>{columnKey}</strong>&nbsp;{value}
                </p>
            ))}
        </Container>
    );
};

export default Card;
