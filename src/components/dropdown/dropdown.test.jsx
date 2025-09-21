import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RadioDropdown, CheckboxDropdown } from './Dropdown.jsx';

// Radio Dropdown component tests
describe('RadioDropdown', () => {
    const items = [
        { label: 'Option One', color: '#ff0000' },
        { label: 'Option Two', color: '#00ff00' },
        'Option Three',
    ];

    let setSelectedItemMock;

    beforeEach(() => {
        setSelectedItemMock = vi.fn();
    });

    describe('Render', () => {
        it('renders placeholder when no item is selected', () => {
            render(<RadioDropdown items={items} selectedItem={null} setSelectedItem={setSelectedItemMock} />);
            expect(screen.getByText('Select an item...')).toBeInTheDocument();
        });

        it('renders selected item label', () => {
            render(<RadioDropdown items={items} selectedItem={items[0]} setSelectedItem={setSelectedItemMock} />);
            expect(screen.getByText('Option One')).toBeInTheDocument();
        });
    });


    describe('User interactions', () => {
        it('opens and closes dropdown when header is clicked', () => {
            render(<RadioDropdown items={items} selectedItem={null} setSelectedItem={setSelectedItemMock} />);
            fireEvent.click(screen.getByText('Select an item...'));
            expect(screen.getByText('Option One')).toBeInTheDocument();

            fireEvent.click(screen.getByText('Select an item...'));
            expect(screen.queryByText('Option One')).not.toBeInTheDocument();
        });

        it('calls setSelectedItem when an item is clicked', () => {
            render(<RadioDropdown items={items} selectedItem={null} setSelectedItem={setSelectedItemMock} />);
            fireEvent.click(screen.getByText('Select an item...'));
            fireEvent.click(screen.getByText('Option Two'));
            expect(setSelectedItemMock).toHaveBeenCalledWith(items[1]);
        });
    });
});

// Checkbox dropdown component tests
describe('CheckboxDropdown', () => {
    const items = [
        { label: 'Option One', color: '#ff0000' },
        { label: 'Option Two', color: '#00ff00' },
        'Option Three',
    ];

    let setSelectedItemsMock;

    beforeEach(() => {
        setSelectedItemsMock = vi.fn();
    });

    describe('Render', () => {
        it('renders placeholder when no items are selected', () => {
            render(<CheckboxDropdown items={items} selectedItems={[]} setSelectedItems={setSelectedItemsMock} />);
            expect(screen.getByText('Select items...')).toBeInTheDocument();
        });

        it('renders number of selected items', () => {
            render(<CheckboxDropdown items={items} selectedItems={[items[0], items[2]]} setSelectedItems={setSelectedItemsMock} />);
            expect(screen.getByText('2 Selected')).toBeInTheDocument();
        });
    });

    describe('User interactions', () => {
        it('opens and closes dropdown when header is clicked', () => {
            render(<CheckboxDropdown items={items} selectedItems={[]} setSelectedItems={setSelectedItemsMock} />);
            fireEvent.click(screen.getByText('Select items...'));
            expect(screen.getByText('Option One')).toBeInTheDocument();

            fireEvent.click(screen.getByText('Select items...'));
            expect(screen.queryByText('Option One')).not.toBeInTheDocument();
        });

        it('calls setSelectedItems with new item when selecting an item', () => {
            render(<CheckboxDropdown items={items} selectedItems={[]} setSelectedItems={setSelectedItemsMock} />);
            fireEvent.click(screen.getByText('Select items...'));
            fireEvent.click(screen.getByText('Option One'));
            expect(setSelectedItemsMock).toHaveBeenCalled();
        });

        it('calls setSelectedItems to remove item when already selected item is clicked', () => {
            render(<CheckboxDropdown items={items} selectedItems={[items[0]]} setSelectedItems={setSelectedItemsMock} />);
            fireEvent.click(screen.getByText('1 Selected'));
            fireEvent.click(screen.getByText('Option One'));
            expect(setSelectedItemsMock).toHaveBeenCalled();
        });
    });
});
