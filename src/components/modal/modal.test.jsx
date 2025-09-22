import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from './Modal.jsx';

// Tests for the Modal component
describe('Modal', () => {
    const mockOnClose = vi.fn();

    beforeEach(() => {
        mockOnClose.mockClear();
    });

    describe('Render', () => {
        it('renders modal when isOpen is true', () => {
            render(
                <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
                    <p>Modal content</p>
                </Modal>
            );

            expect(screen.getByText('Test Modal')).toBeInTheDocument();
            expect(screen.getByText('Modal content')).toBeInTheDocument();
        });

        it('does not render when isOpen is false', () => {
            render(
                <Modal isOpen={false} onClose={mockOnClose} title="Test Modal">
                    <p>Modal content</p>
                </Modal>
            );

            expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
            expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
        });

        it('renders X icon in close button', () => {
            render(
                <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
                    <p>Modal content</p>
                </Modal>
            );

            expect(screen.getByRole('button')).toBeInTheDocument();
        });
    });

    describe('User interactions', () => {
        it('calls onClose when clicking the X button', () => {
            render(
                <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
                    <p>Modal content</p>
                </Modal>
            );

            fireEvent.click(screen.getByRole('button'));

            expect(mockOnClose).toHaveBeenCalledTimes(1);
        });

        it('calls onClose when clicking the backdrop', () => {
            render(
                <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
                    <p>Modal content</p>
                </Modal>
            );

            fireEvent.click(screen.getByTestId('modal-backdrop'));

            expect(mockOnClose).toHaveBeenCalledTimes(1);
        });

        it('does not call onClose when clicking modal content', () => {
            render(
                <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
                    <p>Modal content</p>
                </Modal>
            );

            const modalContent = screen.getByText('Modal content');
            fireEvent.click(modalContent);

            expect(mockOnClose).not.toHaveBeenCalled();
        });
    });

    describe('CSS classes and structure', () => {
        it('applies correct CSS classes', () => {
            render(
                <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
                    <p>Modal content</p>
                </Modal>
            );

            expect(screen.getByTestId('modal-backdrop')).toHaveClass('modal-backdrop');
            expect(screen.getByTestId('modal')).toHaveClass('modal');
            expect(screen.getByTestId('modal-header')).toHaveClass('modal-header');
            expect(screen.getByText('Test Modal')).toHaveClass('modal-title');
            expect(screen.getByRole('button')).toHaveClass('modal-close-btn');
            expect(screen.getByTestId('modal-content')).toHaveClass('modal-content');
        });
    });
});