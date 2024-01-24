import {getTeams} from 'api';
import {useEffect, useMemo, useState} from 'react';
import {Teams} from 'types';

export const useTeamsList = () => {
    const [teams, setTeams] = useState<Teams[]>([]);
    const [query, setQuery] = useState('');
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

    const teamsFiltered = useMemo(() => {
        return teams.filter((team) => team.name.replace(/\s/g, '').toLowerCase().includes(query.replace(/\s/g, '').toLowerCase()));
    }, [teams, query]);

    return {isLoading, setQuery, query, teamsFiltered};
};