import Modal from "../modal/Modal.jsx";
import Button from "../button/Button.jsx";
import {CheckboxDropdown, RadioDropdown} from "../dropdown/Dropdown.jsx";
import {extraLightColor, mediumColor} from "../utils.js";
import {useState} from "react";

const CreateSiteModal = ({isModalOpen, closeModal}) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [categories, setCategories] = useState([]);

    const categoryItems = [
        {label: "Sidewalk Shed", color: mediumColor('green')},
        {label: "Scaffold", color: mediumColor('yellow')},
        {label: "Shoring", color: "var(--purple)"},
    ]

    const statusItems = [
        {label: "Completed", color: mediumColor('green')},
        {label: "On Hold", color: mediumColor('yellow')},
        {label: "In Progress", color: extraLightColor('green')},
    ]

    return (
        <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            title="Create jobsite"
        >
            <div className="create-site-modal">
                <form>
                    <div>
                        <label htmlFor="name" className="form-label">Name</label>
                        <input className={'input'} id={'name'} placeholder={"Type the jobsite's name"}/>
                    </div>
                    <div className="dropdowns">
                        <div>
                            <label htmlFor="category" className="form-label">Category Included</label>
                            <CheckboxDropdown items={categoryItems} selectedItems={categories} setSelectedItems={setCategories}/>
                        </div>
                        <div>
                            <label htmlFor="status" className="form-label">Status</label>
                            <RadioDropdown items={statusItems} selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
                        </div>
                    </div>
                </form>
                <div className={'modal-buttons'}>
                    <Button variant={'cancel'} colorTone={'light'} onClick={closeModal} />
                    <Button variant={'save'} colorTone={'light'} onClick={closeModal} />
                </div>
            </div>
        </Modal>
    )
}

export default CreateSiteModal;