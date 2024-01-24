import {getTeamOverview, getUserData} from 'api';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {UserData} from 'types';

interface PageState {
    teamLead?: UserData;
    teamMembers?: UserData[];
}

export const useTeamUsers = () => {
    const {teamId} = useParams();
    const [pageData, setPageData] = useState<PageState>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const getTeamUsers = async () => {
            const {teamLeadId, teamMemberIds = []} = await getTeamOverview(teamId);
            const [teamLead, ...teamMembers] = await Promise.all([getUserData(teamLeadId), ...teamMemberIds.map(getUserData)]);
            setPageData(() => {
                setIsLoading(false);
                return {
                    teamLead,
                    teamMembers,
                };
            });
        };
        getTeamUsers();
    }, [teamId]);

    return {
        pageData,
        isLoading,
        setPageData,
        setIsLoading,
    };
};