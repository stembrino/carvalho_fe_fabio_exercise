import {getTeamOverview, getUserData} from 'api';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {UserData} from 'types';

interface TeamUsers {
    teamLead?: UserData;
    teamMembers?: UserData[];
}

export const useTeamUsers = () => {
    const {teamId} = useParams();
    const [teamUsers, setTeamUsers] = useState<TeamUsers>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const getTeamUsers = async () => {
            const {teamLeadId, teamMemberIds = []} = await getTeamOverview(teamId);
            const [teamLead, ...teamMembers] = await Promise.all([getUserData(teamLeadId), ...teamMemberIds.map(getUserData)]);
            setIsLoading(() => {
                setTeamUsers({teamLead, teamMembers});
                return false;
            });
        };
        getTeamUsers();
    }, [teamId]);

    return {
        teamUsers,
        isLoading,
    };
};