import React from 'react';
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom';
import Overall from './Overall.jsx'

describe('Overall', () => {
    it('should render all three cards', () => {
        render(<Overall />);

        expect(screen.getByText('In Progress')).toBeInTheDocument()
        expect(screen.getByText('Completed')).toBeInTheDocument()
        expect(screen.getByText('On Hold')).toBeInTheDocument()
    })

    it('should apply correct background colors to cards', () => {
        render(<Overall />)

        const cards = screen.getAllByRole('generic').filter(el =>
            el.className === 'overall-card'
        )

        expect(cards[0]).toHaveStyle('background-color: var(--light-yellow)')
        expect(cards[1]).toHaveStyle('background-color: var(--light-green)')
        expect(cards[2]).toHaveStyle('background-color: var(--light-red)')
    })

    it('should have correct overall structure', () => {
        render(<Overall />)

        const overallContainer = document.querySelector('.overall')
        expect(overallContainer).toBeInTheDocument()

        const cards = screen.getAllByRole('generic').filter(el =>
            el.className === 'overall-card'
        )
        expect(cards).toHaveLength(3)
    })
})