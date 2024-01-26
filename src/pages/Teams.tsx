import React from 'react';
import {ListItem} from 'types';
import SearchBar from 'components/SearchBar';
import Header from '../components/Header';
import List from '../components/List';
import {Container} from '../components/GlobalComponents';
import {useTeamsList} from './hooks/useTeamsList';

const Teams: React.FC = () => {
    const {isLoading, teamsFiltered, setQuery, query} = useTeamsList();

    const teamsList = () => {
        return teamsFiltered.map(team => {
            var columns = [
                {
                    key: 'Name',
                    value: team.name,
                },
            ];
            return {
                id: team.id,
                url: `/team/${team.id}`,
                columns,
                navigationProps: team,
            } as ListItem;
        });
    };

    return (
        <Container>
            <Header title="Teams" showBackButton={false} />
            <SearchBar onChange={setQuery} value={query} placeholder="Search by name" width={320} />
            <List items={teamsList()} isLoading={isLoading} align="center" />
        </Container>
    );
};

export default Teams;
