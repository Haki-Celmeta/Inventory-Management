import {useEffect, useRef, useState} from "react";
import "./dropdown.css"
import {capitalizeEachWord, darkColor, extraLightColor, lightColor} from "../utils.js";

const Dropdown = ({ dropdownItems, initialItem}) => {
    const [selectedItem, setSelectedItem] = useState(initialItem);
    const [color, setColor] = useState("#fff");
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Select Color
    useEffect(() => {
        const c = selectColor(selectedItem);
        if(c) setColor(c);
    }, [selectedItem]);

    // Close dropdown if clicked outside
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

    // Select color switch
    const selectColor = (item) => {
        switch(item.toLowerCase()) {
            case 'completed':
                return darkColor("green");
            case 'on hold':
                return lightColor("yellow");
            case 'in progress':
                return extraLightColor("green");
            default:
                return "#fff"
        }
    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setIsOpen(false);
    };

    return (
        <div className="dropdown-container" ref={dropdownRef}>
            <div className="dropdown-header" onClick={toggleDropdown} style={{backgroundColor: color}}>
                <span className="dropdown-text">
                  {capitalizeEachWord(selectedItem) || "Select an item..."}
                </span>
            </div>

            {isOpen && (
                <div className="dropdown-list">
                    {dropdownItems?.map((item, index) => (
                        <div
                            key={index}
                            className={`dropdown-item ${item === selectedItem ? "selected" : ""}`}
                            onClick={() => handleItemClick(item)}
                            style={{backgroundColor: item === selectedItem ? selectColor(item) : "#fff"}}
                        >
                            {capitalizeEachWord(item)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Dropdown;