import * as React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
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
    const teamsMocked = [
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
        jest.spyOn(API, 'getTeams').mockResolvedValue(teamsMocked);
        render(<Teams />);
    };

    describe('Render test', () => {
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

    describe('Filter tests', () => {
        it('should find teams name until be different', async () => {
            setUp();
            const input = screen.getByLabelText('Search');
            fireEvent.change(input, {target: {value: 'Team'}});
            await waitFor(() => {
                expect(screen.getByText('Team2')).toBeInTheDocument();
            });
            await waitFor(() => {
                expect(screen.getByText('Team1')).toBeInTheDocument();
            });
        });

        it('should find Team 1', async () => {
            setUp();
            const input = screen.getByLabelText('Search');
            fireEvent.change(input, {target: {value: 'Team 1'}});
            await waitFor(() => {
                expect(screen.queryByText('Team2')).not.toBeInTheDocument();
            });
            await waitFor(() => {
                expect(screen.getByText('Team1')).toBeInTheDocument();
            });
        });

        it('should not consider spaces', async () => {
            setUp();
            const input = screen.getByLabelText('Search');
            fireEvent.change(input, {target: {value: '  te a  m 1  '}});
            await waitFor(() => {
                expect(screen.getByText('Team1')).toBeInTheDocument();
            });
        });

        it('should be case insensitive', async () => {
            setUp();
            const input = screen.getByLabelText('Search');
            fireEvent.change(input, {target: {value: 'tEaM2'}});
            await waitFor(() => {
                expect(screen.getByText('Team2')).toBeInTheDocument();
            });
        });
    });
});
