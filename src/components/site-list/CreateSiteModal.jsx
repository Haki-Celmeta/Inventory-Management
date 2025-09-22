import Modal from "../modal/Modal.jsx";
import Button from "../button/Button.jsx";
import {CheckboxDropdown, RadioDropdown} from "../dropdown/Dropdown.jsx";
import {extraLightColor, mediumColor} from "../utils.js";
import {X} from 'lucide-react'
import {useState} from "react";
import {useJobSite} from "../context/JobSiteContext.jsx";

const CreateSiteModal = ({isModalOpen, closeModal}) => {
    const [status, setStatus] = useState(null);
    const [categories, setCategories] = useState([]);
    const [address, setAddress] = useState('');
    const {addJobSite, categoryItems, statusItems} = useJobSite()

    const handleSave = (e) => {
        e.preventDefault();

        const data = {
            address: address,
            status: status?.label?.toLowerCase(),
            categories: categories.map(categoryItem => categoryItem.label.toLowerCase()),
        }

        addJobSite(data)
        closeModal()
        setStatus(null)
        setCategories([])
        setAddress('')
    }

    const handleRemoveCategory = (label) => {
        setCategories(
            categories.filter(categoryItem => categoryItem.label.toLowerCase() !== label.toLowerCase())
        )
    }

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
                        <input
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            className={'input'}
                            id={'name'}
                            placeholder={"Type the jobsite's name"}
                        />
                    </div>
                    <div className="dropdowns">
                        <div>
                            <label htmlFor="category" className="form-label">Category Included</label>
                            <CheckboxDropdown items={categoryItems} selectedItems={categories}
                                              setSelectedItems={setCategories}/>
                        </div>

                        <div>
                            <label htmlFor="status" className="form-label">Status</label>
                            <RadioDropdown items={statusItems} selectedItem={status} setSelectedItem={setStatus}/>
                        </div>
                    </div>
                </form>
                <div className={'category-selected'}>
                    {categories.map(category => (
                        <div className={'category-item'} key={category.label}>
                            <span className={'dot'} style={{backgroundColor: category.color}}></span>
                            <span>{category.label}</span>
                            <span
                                className={'remove'}
                                onClick={() => handleRemoveCategory(category.label)}
                            >
                                <X size={15}/>
                            </span>
                        </div>
                    ))}
                </div>
                <div className={'modal-buttons'}>
                    <Button variant={'cancel'} colorTone={'light'} onClick={closeModal}/>
                    <Button variant={'save'} colorTone={'light'} onClick={handleSave}/>
                </div>
            </div>
        </Modal>
    )
}

export default CreateSiteModal;