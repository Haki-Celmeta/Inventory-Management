import {useEffect, useRef, useState} from "react";
import "./dropdown.css"
import {capitalizeEachWord, darkColor, extraLightColor, lightColor} from "../utils.js";
import {ChevronDown, Check} from 'lucide-react'

export const RadioDropdown = ({ items, selectedItem, setSelectedItem }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setIsOpen(false);
    };

    const getSelectedItemLabel = () => {
        if (!selectedItem) return "Select an item...";

        if (typeof selectedItem === 'object' && selectedItem.label) {
            return capitalizeEachWord(selectedItem.label);
        }
        return capitalizeEachWord(selectedItem);
    };

    return (
        <div className="dropdown-container" ref={dropdownRef}>
            <div className="dropdown-header" onClick={toggleDropdown}>
                <span className="dropdown-text">
                    {getSelectedItemLabel()}
                </span>
                <ChevronDown className={`dropdown-arrow ${isOpen ? 'open' : ''}`} size={20}/>
            </div>

            {isOpen && (
                <div className="dropdown-list">
                    {items?.map((item, index) => {
                        const isSelected = selectedItem === item ||
                            (typeof item === 'object' && typeof selectedItem === 'object' &&
                                selectedItem !== null && item.label === selectedItem.label);

                        const itemLabel = typeof item === 'object' ? item.label : item;
                        const itemColor = typeof item === 'object' ? item.color : undefined;

                        return (
                            <div
                                key={index}
                                className={`dropdown-item ${isSelected ? "selected" : ""}`}
                                onClick={() => handleItemClick(item)}
                                style={{
                                    backgroundColor: isSelected && itemColor ? itemColor : 'white',
                                    color: isSelected && itemColor ? 'white' : '#333'
                                }}
                            >
                                {capitalizeEachWord(itemLabel)}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export const CheckboxDropdown = ({ items, selectedItems, setSelectedItems }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (item) => {
        setSelectedItems(prev => {
            const itemLabel = typeof item === 'object' ? item.label : item;
            const isAlreadySelected = prev.some(selectedItem => {
                const selectedLabel = typeof selectedItem === 'object' ? selectedItem.label : selectedItem;
                return selectedLabel === itemLabel;
            });

            if (isAlreadySelected) {
                return prev.filter(selectedItem => {
                    const selectedLabel = typeof selectedItem === 'object' ? selectedItem.label : selectedItem;
                    return selectedLabel !== itemLabel;
                });
            } else {
                return [...prev, item];
            }
        });
    };

    const isItemSelected = (item) => {
        const itemLabel = typeof item === 'object' ? item.label : item;
        return selectedItems.some(selectedItem => {
            const selectedLabel = typeof selectedItem === 'object' ? selectedItem.label : selectedItem;
            return selectedLabel === itemLabel;
        });
    };

    return (
        <div className="dropdown-container" ref={dropdownRef}>
            <div className="dropdown-header" onClick={toggleDropdown}>
                <span className="dropdown-text">
                    {selectedItems.length ? `${selectedItems.length} Selected` : "Select items..."}
                </span>
                <ChevronDown className={`dropdown-arrow ${isOpen ? 'open' : ''}`} size={20}/>
            </div>

            {isOpen && (
                <div className="dropdown-list">
                    {items?.map((item, index) => {
                        const isSelected = isItemSelected(item);
                        const itemLabel = typeof item === 'object' ? item.label : item;
                        const itemColor = typeof item === 'object' ? item.color : undefined;

                        return (
                            <div
                                key={index}
                                className={`dropdown-item ${isSelected ? "selected" : ""}`}
                                onClick={() => handleItemClick(item)}
                                style={{
                                    backgroundColor: isSelected && itemColor ? itemColor : 'white',
                                    color: isSelected && itemColor ? 'white' : '#333',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <span>{capitalizeEachWord(itemLabel)}</span>
                                {isSelected && <Check size={16} />}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};