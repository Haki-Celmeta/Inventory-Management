import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SiteList from '../SiteList.jsx';

vi.mock('../../button/Button.jsx', () => ({
    default: ({ onClick }) => <button onClick={onClick}>Create</button>,
}));

vi.mock('../TableOfSites.jsx', () => ({
    default: ({ jobsites }) => (
        <table>
            <tbody>
            {jobsites.map((jobsite, i) => (
                <tr key={i}>
                    <td>{jobsite.address}</td>
                </tr>
            ))}
            </tbody>
        </table>
    ),
}));

vi.mock('../CreateSiteModal.jsx', () => ({
    default: ({ isModalOpen }) =>
        isModalOpen ? <div data-testid="create-site-modal">Modal Content</div> : null,
}));

vi.mock('../../context/JobSiteContext.jsx', () => ({
    useJobSite: () => ({
        data: [
            { address: 'Street 1' },
            { address: 'Street 2' },
        ],
    }),
}));

// Sitelist component tests
describe('SiteList', () => {
    describe('Render', () => {
        it('renders title and search input', () => {
            render(<SiteList />);
            expect(screen.getByText('Title')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('Search a driver')).toBeInTheDocument();
        });

        it('renders table with job sites names', () => {
            render(<SiteList />);
            expect(screen.getByText('Street 1')).toBeInTheDocument();
            expect(screen.getByText('Street 2')).toBeInTheDocument();
        });
    });

    describe('Search function', () => {
        it('filters job sites based on search input', () => {
            render(<SiteList />);
            const searchInput = screen.getByPlaceholderText('Search a driver');

            fireEvent.change(searchInput, { target: { value: 'Street 1' } });
            expect(screen.getByText('Street 1')).toBeInTheDocument();
            expect(screen.queryByText('Street 2')).not.toBeInTheDocument();
        });

        it('shows "No results found" when search text is not found', () => {
            render(<SiteList />);
            const searchInput = screen.getByPlaceholderText('Search a driver');

            fireEvent.change(searchInput, { target: { value: 'zzz' } });
            expect(screen.getByText('No results found')).toBeInTheDocument();
        });
    });

    describe('Modal interaction', () => {
        it('opens modal when Create button is clicked', () => {
            render(<SiteList />);
            fireEvent.click(screen.getByText('Create'));
            expect(screen.getByTestId('create-site-modal')).toBeInTheDocument();
        });
    });
});


