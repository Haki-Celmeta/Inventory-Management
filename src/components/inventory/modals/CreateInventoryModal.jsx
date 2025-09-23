import Modal from "../../modal/Modal.jsx";
import {useJobSite} from "../../context/JobSiteContext.jsx";
import Button from "../../button/Button.jsx";
import useInventoryService from "../hooks/useInventoryService.jsx";
import useInventoryModal from "../hooks/useInventoryModal.jsx";
import InventoryForm from "../InventoryForm.jsx";

const CreateInventoryModal = ({id, isModalOpen, closeModal, service}) => {
    const { addInventory } = useJobSite();
    const { getServiceItems, getServiceKey } = useInventoryService();
    const { formState, formActions, resetForm, getFormData } = useInventoryModal();

    const serviceItems = getServiceItems(service);

    const handleClose = () => {
        resetForm();
        closeModal();
    };

    const handleSave = (e) => {
        e.preventDefault();

        try {
            const inventoryData = getFormData();
            const serviceKey = getServiceKey(service);

            addInventory(id, serviceKey, inventoryData);

            handleClose();
        } catch (error) {
            console.log(error.message);
        }
    }

    const modalTitle = `Create inventory ${service ? `for ${service}` : ""}`;

    return (
        <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            title={modalTitle}
        >
            <div className={'inventory-modal'}>
                <InventoryForm
                    formState={formState}
                    formActions={formActions}
                    serviceItems={serviceItems}
                    onSubmit={handleSave}
                />

                <div style={{
                    display: 'flex',
                    justifyContent: 'end',
                    marginTop: '1rem'
                }}>
                    <Button
                        variant={'save'}
                        colorTone={'light'}
                        onClick={handleSave}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default CreateInventoryModal