import Modal from "../../modal/Modal.jsx";
import {useState, useEffect} from "react";
import {useJobSite} from "../../context/JobSiteContext.jsx";
import Button from "../../button/Button.jsx";
import useInventoryModal from "../hooks/useInventoryModal.jsx";
import useInventoryService from "../hooks/useInventoryService.jsx";
import InventoryForm from "../InventoryForm.jsx";

const UpdateInventoryModal = ({
      jobSiteId,
      isModalOpen,
      closeModal,
      service,
      inventoryData = null
    }) => {
    const { updateInventory } = useJobSite();
    const { getServiceItems, getServiceKey } = useInventoryService();
    const { formState, formActions, resetForm, populateForm,getFormData } = useInventoryModal();

    const serviceItems = getServiceItems(service);

    useEffect(() => {
        if (isModalOpen && inventoryData) {
            populateForm(inventoryData, serviceItems);
        }
    }, [isModalOpen, inventoryData, serviceItems]);

    const handleClose = () => {
        resetForm();
        closeModal();
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const updatedData = getFormData();
            const serviceKey = getServiceKey(service);

            updateInventory(
                jobSiteId,
                serviceKey,
                inventoryData.id,
                updatedData
            );

            handleClose();
        } catch (error) {
            console.error(error.message);
        }
    };

    if (!inventoryData) {
        return null;
    }

    const modalTitle = `Update inventory ${service ? `for ${service}` : ""}`;

    return (
        <Modal
            isOpen={isModalOpen}
            onClose={handleClose}
            title={modalTitle}
        >
            <div className={'inventory-modal'}>
                <InventoryForm
                    formState={formState}
                    formActions={formActions}
                    serviceItems={serviceItems}
                    onSubmit={handleUpdate}
                />

                <div style={{
                    display: 'flex',
                    justifyContent: 'end',
                    marginTop: '1rem',
                    gap: '0.5rem'
                }}>
                    <Button
                        variant={'cancel'}
                        colorTone={'light'}
                        onClick={handleClose}
                    />
                    <Button
                        variant={'save'}
                        colorTone={'light'}
                        onClick={handleUpdate}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default UpdateInventoryModal;