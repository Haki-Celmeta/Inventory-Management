import { RadioDropdown } from "../dropdown/Dropdown.jsx";

/**
 * Reusable form component for inventory item creation and updating.
 * Has a radio dropdown, input for quantity, and two textarea for description and notes.
 */
const InventoryForm = ({
       formState,
       formActions,
       serviceItems,
       onSubmit,
       disabled = false
    }) => {
    const { selectedItem, quantity, description, notes } = formState;
    const { setSelectedItem, setQuantity, setDescription, setNotes } = formActions;

    return (
        <form onSubmit={onSubmit}>
            <div className={'item-quantity'}>
                <div>
                    <label htmlFor={'item'}>Item</label>
                    <RadioDropdown
                        items={serviceItems}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                        disabled={disabled}
                    />
                </div>
                <div>
                    <label htmlFor={'quantity'}>Quantity</label>
                    <input
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className={'input'}
                        id={'quantity'}
                        name={'quantity'}
                        placeholder={'Set Quantity'}
                        type="number"
                        min="0"
                        step="1"
                        disabled={disabled}
                    />
                </div>
            </div>

            <div className={'description'}>
                <label htmlFor={'description'}>Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ resize: 'none' }}
                    rows="5"
                    cols="50"
                    className={'input'}
                    placeholder={'Type the description...'}
                    id={'description'}
                    disabled={disabled}
                />
            </div>

            <div className={'notes'}>
                <label htmlFor={'notes'}>Notes</label>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    style={{ resize: 'none' }}
                    rows="5"
                    cols="50"
                    className={'input'}
                    placeholder={'Type the note...'}
                    id={'notes'}
                    disabled={disabled}
                />
            </div>
        </form>
    );
};

export default InventoryForm;