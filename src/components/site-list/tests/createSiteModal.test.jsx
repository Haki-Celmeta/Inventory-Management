import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateSiteModal from '../CreateSiteModal.jsx';

const mockAddJobSite = vi.fn();
const mockCategoryItems = [
    { label: "Sidewalk Shed", color: "green" },
    { label: "Scaffold", color: "yellow" },
];
const mockStatusItems = [
    { label: "In Progress", color: "blue" },
    { label: "Completed", color: "green" },
];

vi.mock('../../context/JobSiteContext.jsx', () => ({
    useJobSite: () => ({
        addJobSite: mockAddJobSite,
        categoryItems: mockCategoryItems,
        statusItems: mockStatusItems,
    }),
}));

describe('CreateSiteModal', () => {
    const mockCloseModal = vi.fn();

    beforeEach(() => {
        mockCloseModal.mockClear();
        mockAddJobSite.mockClear();
    });

    describe('Render', () => {
        it('renders modal content when open', () => {
            render(<CreateSiteModal isModalOpen={true} closeModal={mockCloseModal} />);
            expect(screen.getByText('Create jobsite')).toBeInTheDocument();
            expect(screen.getByText('Name')).toBeInTheDocument();
            expect(screen.getByText('Category Included')).toBeInTheDocument();
            expect(screen.getByText('Status')).toBeInTheDocument();
        });

        it('does not render when closed', () => {
            render(<CreateSiteModal isModalOpen={false} closeModal={mockCloseModal} />);
            expect(screen.queryByText('Create jobsite')).not.toBeInTheDocument();
        });
    });

    describe('User interactions', () => {
        it('updates address input field', () => {
            render(<CreateSiteModal isModalOpen={true} closeModal={mockCloseModal} />);
            const input = screen.getByPlaceholderText("Type the jobsite's name");
            fireEvent.change(input, { target: { value: 'New Site' } });
            expect(input.value).toBe('New Site');
        });

        it('selects categories and displays them as selected items', () => {
            render(<CreateSiteModal isModalOpen={true} closeModal={mockCloseModal} />);
            fireEvent.click(screen.getByText('Select items...'));
            fireEvent.click(screen.getByText('Sidewalk Shed'));
            fireEvent.click(screen.getByText('Scaffold'));
            expect(screen.getByText('2 Selected')).toBeInTheDocument();
        });

        it('selects a status in RadioDropdown', () => {
            render(<CreateSiteModal isModalOpen={true} closeModal={mockCloseModal} />);
            fireEvent.click(screen.getByText('Select an item...'));
            fireEvent.click(screen.getByText('In Progress'));
            expect(screen.getByText('In Progress')).toBeInTheDocument();
        });

        it('calls closeModal when Cancel button is clicked', () => {
            render(<CreateSiteModal isModalOpen={true} closeModal={mockCloseModal} />);
            fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
            expect(mockCloseModal).toHaveBeenCalledTimes(1);
        });

        it('calls addJobSite when Save button is clicked', () => {
            render(<CreateSiteModal isModalOpen={true} closeModal={mockCloseModal} />);
            // type address
            fireEvent.change(screen.getByPlaceholderText("Type the jobsite's name"), {
                target: { value: 'New Site' },
            });
            // select category
            fireEvent.click(screen.getByText('Select items...'));
            fireEvent.click(screen.getByText('Sidewalk Shed'));
            // select status
            fireEvent.click(screen.getByText('Select an item...'));
            fireEvent.click(screen.getByText('Completed'));
            // save
            fireEvent.click(screen.getByRole('button', { name: /save/i }));
            expect(mockAddJobSite).toHaveBeenCalledWith({
                address: 'New Site',
                status: 'completed',
                categories: ['sidewalk shed'],
            });
            expect(mockCloseModal).toHaveBeenCalled();
        });
    });
});
