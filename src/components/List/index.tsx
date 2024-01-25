import * as React from 'react';
import {ListItem} from 'types';
import Card from '../Card';
import {Spinner} from '../Spinner';
import {Container} from './styles';

interface Props {
    items?: ListItem[];
    isLoading: boolean;
}

const List: React.FC<Props> = ({items, isLoading}) => {
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
                        />
                    );
                })}
        </Container>
    );
};

export default List;
