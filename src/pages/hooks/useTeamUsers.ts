import {getTeamOverview, getUserData} from 'api';
import {useEffect, useMemo, useState} from 'react';
import {useParams} from 'react-router-dom';
import {UserData} from 'types';

export const useTeamUsers = () => {
    const {teamId} = useParams();
    const [teamLead, setTeamLead] = useState<UserData>({} as UserData);
    const [teamMembers, setTeamMembers] = useState<UserData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [query, setQuery] = useState('');

    useEffect(() => {
        const getTeamUsers = async () => {
            const {teamLeadId, teamMemberIds = []} = await getTeamOverview(teamId);
            const [teamLeadResponse, ...teamMembersResponse] = await Promise.all([
                getUserData(teamLeadId),
                ...teamMemberIds.map(getUserData),
            ]);
            setIsLoading(() => {
                setTeamLead(teamLeadResponse);
                setTeamMembers(teamMembersResponse);
                return false;
            });
        };
        getTeamUsers();
    }, [teamId]);

    const teamMembersFiltered = useMemo(() => {
        return teamMembers.filter(({firstName, lastName}) => {
            const fullName = `${firstName} ${lastName}`;
            return fullName
                .replace(/\s/g, '')
                .toLowerCase()
                .includes(query.replace(/\s/g, '').toLowerCase());
        });
    }, [teamMembers, query]);

    return {
        teamLead,
        isLoading,
        teamMembersFiltered,
        setQuery,
        query,
    };
};
