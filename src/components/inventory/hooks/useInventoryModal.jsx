import { useState } from 'react';

const useInventoryModal = () => {
    const [selectedItem, setSelectedItem] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [description, setDescription] = useState("");
    const [notes, setNotes] = useState("");

    const resetForm = () => {
        setSelectedItem("");
        setQuantity(0);
        setDescription("");
        setNotes("");
    };

    const populateForm = (inventoryData, serviceItems) => {
        if (!inventoryData) return;

        const matchingItem = serviceItems.find(item => item.label === inventoryData.item);
        setSelectedItem(matchingItem || "");
        setQuantity(inventoryData.quantity || 0);
        setDescription(inventoryData.description || "");
        setNotes(inventoryData.notes || "");
    };

    const getFormData = () => ({
        item: selectedItem.label,
        quantity: parseInt(quantity),
        description: description.trim(),
        notes: notes.trim(),
    });

    return {
        formState: { selectedItem, quantity, description, notes },
        formActions: { setSelectedItem, setQuantity, setDescription, setNotes },
        resetForm,
        populateForm,
        getFormData
    };
};

export default useInventoryModal;