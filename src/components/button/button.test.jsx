import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

// Tests for the button component
describe('Button', () => {
    // Create button
    describe('Variant: create', () => {
        it('renders create button', () => {
            render(<Button variant="create" colorTone="light" />);

            expect(screen.getByText('Create')).toBeInTheDocument();
            expect(screen.getByTestId('plus-icon')).toBeInTheDocument();
            expect(screen.getByTestId('plus-icon')).toHaveAttribute('data-size', '20');
        });

        it('applies correct light color for create variant', () => {
            render(<Button variant="create" colorTone="light" />);

            expect(screen.getByRole('button')).toHaveStyle({ backgroundColor: 'var(--light-green)' });
        });

        it('applies correct medium color for create variant', () => {
            render(<Button variant="create" colorTone="medium" />);

            expect(screen.getByRole('button')).toHaveStyle({ backgroundColor: 'var(--medium-green)' });
        });

        it('defaults to medium color when colorTone is not light', () => {
            render(<Button variant="create" colorTone="dark" />);

            expect(screen.getByRole('button')).toHaveStyle({ backgroundColor: 'var(--medium-green)' });
        });
    });

    // Save button
    describe('Variant: save', () => {
        it('renders save button with correct text and icon', () => {
            render(<Button variant="save" colorTone="light" />);

            expect(screen.getByText('Save Changes')).toBeInTheDocument();
            expect(screen.getByTestId('check-icon')).toBeInTheDocument();
            expect(screen.getByTestId('check-icon')).toHaveAttribute('data-size', '20');
        });

        it('applies correct light color for save variant', () => {
            render(<Button variant="save" colorTone="light" />);

            expect(screen.getByRole('button')).toHaveStyle({ backgroundColor: 'var(--light-green)' });
        });

        it('applies correct medium color for save variant', () => {
            render(<Button variant="save" colorTone="medium" />);

            expect(screen.getByRole('button')).toHaveStyle({ backgroundColor: 'var(--medium-green)' });
        });
    });

    // Cancel button
    describe('Variant: cancel', () => {
        it('renders cancel button with correct text and icon', () => {
            render(<Button variant="cancel" colorTone="light" />);

            expect(screen.getByText('Cancel Changes')).toBeInTheDocument();
            expect(screen.getByTestId('x-icon')).toBeInTheDocument();
            expect(screen.getByTestId('x-icon')).toHaveAttribute('data-size', '20');
        });

        it('applies correct light color for cancel variant', () => {
            render(<Button variant="cancel" colorTone="light" />);

            expect(screen.getByRole('button')).toHaveStyle({ backgroundColor: 'var(--light-red)' });
        });

        it('applies correct medium color for cancel variant', () => {
            render(<Button variant="cancel" colorTone="medium" />);

            expect(screen.getByRole('button')).toHaveStyle({ backgroundColor: 'var(--medium-red)' });
        });
    });

    // Back button
    describe('Variant: back', () => {
        it('renders back button with correct text and icon', () => {
            render(<Button variant="back" colorTone="light" />);

            expect(screen.getByText('Go Back')).toBeInTheDocument();
            expect(screen.getByTestId('arrow-left-icon')).toBeInTheDocument();
            expect(screen.getByTestId('arrow-left-icon')).toHaveAttribute('data-size', '20');
        });

        it('applies correct light color for back variant', () => {
            render(<Button variant="back" colorTone="light" />);

            expect(screen.getByRole('button')).toHaveStyle({ backgroundColor: 'var(--light-blue)' });
        });

        it('applies correct medium color for back variant', () => {
            render(<Button variant="back" colorTone="medium" />);

            expect(screen.getByRole('button')).toHaveStyle({ backgroundColor: 'var(--medium-blue)' });
        });
    });

    // Special cases
    describe('Edge cases', () => {
        it('handles missing variant prop', () => {
            render(<Button colorTone="light" />);

            const button = screen.getByRole('button');
            expect(button).toBeInTheDocument();
            expect(button).toHaveTextContent('Button');
            expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
        })

        it('handles missing colorTone prop (defaults to medium)', () => {
            render(<Button variant="create" />);

            const button = screen.getByRole('button');
            expect(button).toBeInTheDocument();
            expect(button).toHaveStyle({ backgroundColor: 'var(--medium-green)' });
            expect(screen.getByText('Create')).toBeInTheDocument();
            expect(screen.getByTestId('plus-icon')).toBeInTheDocument();
        });

        it('handles undefined props gracefully', () => {
            render(<Button />);

            const button = screen.getByRole('button');
            expect(button).toBeInTheDocument();
            expect(button).toHaveClass('button');
        });
    });

    describe('CSS classes and structure', () => {
        it('applies correct CSS class', () => {
            render(<Button variant="create" colorTone="light" />);

            const button = screen.getByRole('button');
            expect(button).toHaveClass('button');
        });

        it('applies inline styles correctly', () => {
            render(<Button variant="cancel" colorTone="light" />);

            const button = screen.getByRole('button');
            expect(button).toHaveAttribute('style');
            expect(button.style.backgroundColor).toBe('var(--light-red)');
        });
    });
});
