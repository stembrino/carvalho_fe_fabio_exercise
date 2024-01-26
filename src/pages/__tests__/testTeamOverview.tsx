import * as React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {UserData} from 'types';
import * as API from '../../api';
import TeamOverview from '../TeamOverview';

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            teamName: 'Some Team',
        },
    }),
    useNavigate: () => ({}),
    useParams: () => ({
        teamId: '1',
    }),
}));

describe('TeamOverview', () => {
    const teamOverview = {
        id: '1',
        teamLeadId: '2',
        teamMemberIds: ['3', '4'],
    };
    const userData2: UserData = {
        id: '2',
        firstName: 'name 2 lead',
        lastName: 'lastName 2 lead',
        displayName: 'displayName 2 lead',
        location: 'location lead',
        avatar: '',
    };
    const userData3: UserData = {
        id: '3',
        firstName: 'name 3',
        lastName: 'lastName 3',
        displayName: 'displayName 3',
        location: '',
        avatar: '',
    };
    const userData4: UserData = {
        id: '4',
        firstName: 'name 4',
        lastName: 'lastName 4',
        displayName: 'displayName 4',
        location: '',
        avatar: '',
    };

    const setUp = () => {
        jest.spyOn(API, 'getTeamOverview').mockResolvedValue(teamOverview);
        jest.spyOn(API, 'getUserData').mockImplementation(userId => {
            switch (userId) {
                case '2':
                    return Promise.resolve(userData2);
                case '3':
                    return Promise.resolve(userData3);
                default:
                    return Promise.resolve(userData4);
            }
        });
        render(<TeamOverview />);
    };

    describe('Render tests', () => {
        it('should render teams lead card: user 2 as a lead', async () => {
            setUp();
            await waitFor(() => {
                expect(screen.getByTestId('cardContainer-2-lead')).toBeInTheDocument();
            });
        });

        it('should render team member card: user 3 as a member', async () => {
            setUp();
            await waitFor(() => {
                expect(screen.getByTestId('cardContainer-3-member')).toBeInTheDocument();
            });
        });

        it('should render team member card: user 4 as a member', async () => {
            setUp();
            await waitFor(() => {
                expect(screen.getByTestId('cardContainer-4-member')).toBeInTheDocument();
            });
        });

        it('should render spinner load while requesting', async () => {
            setUp();
            expect(screen.getByTestId('spinner')).toBeInTheDocument();
            await waitFor(() => {
                expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
            });
        });
    });

    describe('Filter tests', () => {
        it('should find member until be different', async () => {
            setUp();
            const input = screen.getByLabelText('Search');
            fireEvent.change(input, {target: {value: 'name'}});
            await waitFor(() => {
                expect(screen.getByText('name 3 lastName 3')).toBeInTheDocument();
            });
            await waitFor(() => {
                expect(screen.getByText('name 4 lastName 4')).toBeInTheDocument();
            });
        });

        it('should find member: name 4 lastName 4', async () => {
            setUp();
            const input = screen.getByLabelText('Search');
            fireEvent.change(input, {target: {value: 'name 4 lastName 4'}});
            await waitFor(() => {
                expect(screen.getByText('name 4 lastName 4')).toBeInTheDocument();
            });
        });

        it('should not consider spaces', async () => {
            setUp();
            const input = screen.getByLabelText('Search');
            fireEvent.change(input, {target: {value: '  n a m  e3 l   a st Name 3   '}});
            await waitFor(() => {
                expect(screen.getByText('name 3 lastName 3')).toBeInTheDocument();
            });
            await waitFor(() => {
                expect(screen.queryByText('name 4 lastName 4')).not.toBeInTheDocument();
            });
        });

        it('should be case insensitive', async () => {
            setUp();
            const input = screen.getByLabelText('Search');
            fireEvent.change(input, {target: {value: 'NAME 3 LASTName 3'}});
            await waitFor(() => {
                expect(screen.getByText('name 3 lastName 3')).toBeInTheDocument();
            });
        });
    });
});
