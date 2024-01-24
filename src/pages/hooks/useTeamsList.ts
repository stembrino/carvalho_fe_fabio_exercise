import {getTeams} from 'api';
import {useEffect, useState} from 'react';
import {Teams} from 'types';


export const useTeamsList = () => {
    const [teams, setTeams] = useState<Teams[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTeams = async () => {
            const teamsResponse = await getTeams();
            setIsLoading(() => {
                setTeams(teamsResponse);
                return false;
            });
        };
        fetchTeams();
    }, []);

    return {teams, isLoading};
};