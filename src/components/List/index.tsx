import * as React from 'react';
import {ListItem} from 'types';
import Card from '../Card';
import {Spinner} from '../Spinner';
import {Container} from './styles';

interface Props {
    items?: ListItem[];
    isLoading: boolean;
    align?: 'center' | 'flex-start';
}

const List: React.FC<Props> = ({items, isLoading, align}) => {
    return (
        <Container>
            {isLoading && <Spinner />}
            {!isLoading &&
                items.map(({url, id, columns, navigationProps}, index) => {
                    return (
                        <Card
                            key={`${id}-${index}`}
                            id={id}
                            columns={columns}
                            navigation={{data: navigationProps, url}}
                            align={align}
                        />
                    );
                })}
        </Container>
    );
};

export default List;
