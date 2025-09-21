import Modal from "../modal/Modal.jsx";
import Button from "../button/Button.jsx";

const CreateSiteModal = ({isModalOpen, closeModal}) => {
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
                    <div>
                        <div>
                            <label htmlFor="category" className="form-label">Category Included</label>
                            <input className={'input'} id={'name'} placeholder={"Select"}/>
                        </div>
                        <div>
                            <label htmlFor="status" className="form-label">Status</label>
                            <input className={'input'} id={'status'} placeholder={"Select one"}/>
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