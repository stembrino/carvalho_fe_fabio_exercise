import * as React from 'react';
import {fireEvent, render, screen, waitFor, act} from '@testing-library/react';
import * as API from '../../api';
import Teams from '../Teams';

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            firstName: 'Test',
            lastName: 'User',
            displayName: 'userName',
            location: 'location',
        },
    }),
    useNavigate: () => ({}),
}));

describe('Teams', () => {
    const getTeamsMocked = [
        {
            id: '1',
            name: 'Team1',
        },
        {
            id: '2',
            name: 'Team2',
        },
    ];
    const setUp = () => {
        jest.spyOn(API, 'getTeams').mockResolvedValue(getTeamsMocked);
        render(<Teams />);
    };
    
    it('should render spinner while loading', async () => {
        setUp();
        expect(screen.getByTestId('spinner')).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
        });
    });
    
    it('should render teams list', async () => {
        setUp();
        await waitFor(() => {
            expect(screen.getByText('Team1')).toBeInTheDocument();
        });
        expect(screen.getByText('Team2')).toBeInTheDocument();
    });
});
