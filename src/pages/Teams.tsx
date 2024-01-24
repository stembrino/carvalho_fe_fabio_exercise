import React from 'react';
import {ListItem, Teams as TeamsList} from 'types';
import Header from '../components/Header';
import List from '../components/List';
import {Container} from '../components/GlobalComponents';
import {useTeamsList} from './hooks/useTeamsList';

var MapT = (teams: TeamsList[]) => {
    return teams.map(team => {
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

const Teams: React.FC = () => {
    const {isLoading, teams} = useTeamsList();

    return (
        <Container>
            <Header title="Teams" showBackButton={false} />
            <List items={MapT(teams)} isLoading={isLoading} />
        </Container>
    );
};

export default Teams;
