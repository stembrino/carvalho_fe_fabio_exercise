import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Teams, UserData} from 'types';
import {CardButton} from './styles';
import Body from './Body';

interface Props {
    id?: string;
    columns: Array<{
        key: string;
        value: string;
    }>;
    navigation?: {
        url: string;
        data: UserData | Teams;
    };
}

const Card: React.FC<Props> = ({id, columns, navigation}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (!navigation) {
            return;
        }
        navigate(navigation.url, {
            state: navigation.data,
        });
    };

    return (
        <CardButton
            type="button"
            data-testid={`cardContainer-${id}`}
            $hasNavigation={!!navigation}
            onClick={handleClick}
        >
            {columns.map(({key: columnKey, value}) => (
                <Body key={columnKey} label={columnKey} text={value} />
            ))}
        </CardButton>
    );
};

export default Card;
