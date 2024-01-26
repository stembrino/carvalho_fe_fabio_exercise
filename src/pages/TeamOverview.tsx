import React from 'react';
import {useLocation} from 'react-router-dom';
import {ListItem} from 'types';
import SearchBar from 'components/SearchBar';
import Card from '../components/Card';
import {Container, Sections} from '../components/GlobalComponents';
import Header from '../components/Header';
import List from '../components/List';
import {useTeamUsers} from './hooks/useTeamUsers';

const TeamOverview: React.FC = () => {
    const location = useLocation();
    const {isLoading, teamLead, teamMembersFiltered, query, setQuery} = useTeamUsers();

    const teamLeadCard = (): JSX.Element | null => {
        if (!teamLead) {
            return null;
        }
        const columnsConfig = [
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
            <Card
                id={`${teamLead.id}-lead`}
                columns={columnsConfig}
                navigation={{url: `/user/${teamLead.id}`, data: teamLead}}
            />
        );
    };

    const teamMembers = () => {
        return teamMembersFiltered.map(u => {
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
                id: `${u.id}-member`,
                url: `/user/${u.id}`,
                columns,
                navigationProps: u,
            };
        }) as ListItem[];
    };

    return (
        <Container>
            <Header title={`Team ${location.state.name}`} />
            <Sections>
                <SearchBar
                    onChange={setQuery}
                    value={query}
                    placeholder="Search for team members"
                />
                {!isLoading && teamLeadCard()}
                <List items={teamMembers()} isLoading={isLoading} />
            </Sections>
        </Container>
    );
};

export default TeamOverview;
