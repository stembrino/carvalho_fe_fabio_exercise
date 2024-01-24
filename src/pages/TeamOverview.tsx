import * as React from 'react';
import {useLocation} from 'react-router-dom';
import {ListItem, UserData} from 'types';
import Card from '../components/Card';
import {Container} from '../components/GlobalComponents';
import Header from '../components/Header';
import List from '../components/List';
import {useTeamUsers} from './hooks/useTeamUsers';

var mapArray = (users: UserData[]) => {
    return users.map(u => {
        var columns = [
            {
                key: 'Name',
                value: `${u.firstName} ${u.lastName}`,
            },
            {
                key: 'Display Name',
                value: u.displayName,
            },
            {
                key: 'Location',
                value: u.location,
            },
        ];
        return {
            id: u.id,
            url: `/user/${u.id}`,
            columns,
            navigationProps: u,
        };
    }) as ListItem[];
};


const TeamOverview = () => {
    const location = useLocation();
    const {isLoading, teamUsers: {teamLead, teamMembers}} = useTeamUsers();

    const teamLeadCardColumns = () => [
        {
            key: 'Team Lead',
            value: '',
        },
        {
            key: 'Name',
            value: `${teamLead.firstName} ${teamLead.lastName}`,
        },
        {
            key: 'Display Name',
            value: teamLead.displayName,
        },
        {
            key: 'Location',
            value: teamLead.location,
        },
    ];

    return (
        <Container>
            <Header title={`Team ${location.state.name}`} />
            {!isLoading && <Card columns={teamLeadCardColumns()} url={`/user/${teamLead.id}`} navigationProps={teamLead} />}
            <List items={mapArray(teamMembers ?? [])} isLoading={isLoading} />
        </Container>
    );
};

export default TeamOverview;
