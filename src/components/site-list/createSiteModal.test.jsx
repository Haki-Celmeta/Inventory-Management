import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateSiteModal from './CreateSiteModal.jsx';

// CreateSiteModal component tests
describe('CreateSiteModal', () => {
    const mockCloseModal = vi.fn();

    beforeEach(() => {
        mockCloseModal.mockClear();
    });

    describe('Render', () => {
        it('renders modal content when isModalOpen is true', () => {
            render(<CreateSiteModal isModalOpen={true} closeModal={mockCloseModal} />);
            expect(screen.getByText('Create jobsite')).toBeInTheDocument();
            expect(screen.getByText("Name")).toBeInTheDocument();
            expect(screen.getByText("Category Included")).toBeInTheDocument();
            expect(screen.getByText("Status")).toBeInTheDocument();
        });

        it('does not render modal content when isModalOpen is false', () => {
            render(<CreateSiteModal isModalOpen={false} closeModal={mockCloseModal} />);
            expect(screen.queryByText('Create jobsite')).not.toBeInTheDocument();
        });
    });

    describe('User interactions', () => {
        it('updates input field when typing', () => {
            render(<CreateSiteModal isModalOpen={true} closeModal={mockCloseModal} />);
            const input = screen.getByPlaceholderText("Type the jobsite's name");
            fireEvent.change(input, { target: { value: 'New Site' } });
            expect(input.value).toBe('New Site');
        });

        it('selects multiple categories in CheckboxDropdown', () => {
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
            const cancelBtn = screen.getByRole('button', { name: /cancel/i });
            fireEvent.click(cancelBtn);
            expect(mockCloseModal).toHaveBeenCalledTimes(1);
        });
    });
});
