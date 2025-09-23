import {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {useJobSite} from "../context/JobSiteContext.jsx";
import "./inventory.css"
import {capitalizeEachWord, convertObjectToArray, upperFirst} from "../utils.js";
import Button from "../button/Button.jsx";
import CreateInventoryModal from "./modals/CreateInventoryModal.jsx";
import Loading from "../../pages/Loading.jsx";
import UpdateInventoryModal from "./modals/UpdateInventoryModal.jsx";

const serviceMap = {
    "shed": "sidewalk shed"
};

const getDisplayService = (service) => {
    return serviceMap[service.toLowerCase()] || service;
};

const getServiceKey = (service) => {
    return service.toLowerCase() === "sidewalk shed" ? "shed" : service.toLowerCase();
};

const InventoryCard = ({children, title}) => {
    return (
        <div className={'inventory-card'}>
            <div className={'card-title'}>{title}</div>
            <div className={'card-body'}>{children}</div>
        </div>
    )
}

const ServiceBadges = ({ categories, selectedService, onServiceSelect }) => (
    <div className="badges">
        {categories.map((category) => (
            <button
                key={category}
                className={`badge ${selectedService === category ? 'selected' : ''}`}
                onClick={() => onServiceSelect(category)}
            >
                {capitalizeEachWord(category)}
            </button>
        ))}
    </div>
);

const InventoryTable = ({ tableData, onRowDoubleClick }) => {
    if (!tableData?.length) {
        return (
            <div className="empty-inventory">
                <p>No inventory items found for this service.</p>
                <p>Click "Create" to add the first item.</p>
            </div>
        );
    }

    return (
        <table>
            <thead>
            <tr>
                <th>Nr.</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Description</th>
                <th>Note</th>
            </tr>
            </thead>
            <tbody>
            {tableData.map((item) => (
                <tr
                    key={item.id}
                    onDoubleClick={() => onRowDoubleClick(item)}
                    className="inventory-row"
                    title="Double-click to update"
                >
                    <td>{item.id || ""}</td>
                    <td>{item.item || ""}</td>
                    <td>{item.quantity || ""}</td>
                    <td>{item.description || ""}</td>
                    <td>{item.notes || ""}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

const NoServiceSelected = () => {
    return (
        <div className={'no-service'}>
            <p style={{fontWeight: 'bold'}}>No Service Selected</p>
            <p>Please select a service on your left to proceed.</p>
        </div>
    )
}

const ServiceContent = ({ selectedService, inventoryItems, onCreateClick, onRowDoubleClick }) => {
    if (!selectedService) {
        return <NoServiceSelected />;
    }

    return (
        <div>
            <div className="service-header">
                <Button
                    variant="create"
                    colorTone="medium"
                    onClick={onCreateClick}
                />
            </div>

            <InventoryTable
                tableData={inventoryItems}
                onRowDoubleClick={onRowDoubleClick}
            />
        </div>
    );
};

const useSiteInventory = (id) => {
    const { data, getJobSite } = useJobSite();
    const [siteData, setSiteData] = useState(null);
    const [selectedService, setSelectedService] = useState("");

    useEffect(() => {
        const jobSite = getJobSite(Number(id));
        if (jobSite?.length > 0) {
            setSiteData(jobSite[0]);
        }
    }, [data, id, getJobSite]);

    const categories = siteData ? convertObjectToArray(siteData.categoryIncluded).map(getDisplayService) : [];

    const inventoryItems = siteData && selectedService ?
        siteData.categoryIncluded[getServiceKey(selectedService)] || [] : [];

    return { siteData, selectedService, setSelectedService, categories, inventoryItems };
};

const useModals = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedInventoryItem, setSelectedInventoryItem] = useState(null);

    const openCreateModal = () => setIsCreateModalOpen(true);
    const closeCreateModal = () => setIsCreateModalOpen(false);

    const openUpdateModal = (inventoryItem) => {
        setSelectedInventoryItem(inventoryItem);
        setIsUpdateModalOpen(true);
    };

    const closeUpdateModal = () => {
        setSelectedInventoryItem(null);
        setIsUpdateModalOpen(false);
    };

    return {
        createModal: { isOpen: isCreateModalOpen, open: openCreateModal, close: closeCreateModal },
        updateModal: { isOpen: isUpdateModalOpen, open: openUpdateModal, close: closeUpdateModal, data: selectedInventoryItem}
    };
};

const SiteInventory = () => {
    const { id } = useParams();
    const { siteData, selectedService, setSelectedService, categories, inventoryItems } = useSiteInventory(id);
    const { createModal, updateModal } = useModals();

    if (!siteData) {
        return <Loading />;
    }

    const serviceTitle = selectedService
        ? capitalizeEachWord(selectedService)
        : "No Service";

    return (
        <div className="inventory-container">
            <InventoryCard title={siteData.address}>
                <ServiceBadges categories={categories} selectedService={selectedService} onServiceSelect={setSelectedService} />
                <div className="back-button">
                    <Button variant="back" colorTone="light" onClick={() => window.history.back()} />
                </div>
            </InventoryCard>

            <InventoryCard title={serviceTitle}>
                <ServiceContent
                    selectedService={selectedService}
                    inventoryItems={inventoryItems}
                    onCreateClick={createModal.open}
                    onRowDoubleClick={updateModal.open}
                />
            </InventoryCard>

            <CreateInventoryModal
                id={Number(id)}
                isModalOpen={createModal.isOpen}
                closeModal={createModal.close}
                service={selectedService}
            />

            <UpdateInventoryModal
                jobSiteId={Number(id)}
                isModalOpen={updateModal.isOpen}
                closeModal={updateModal.close}
                service={selectedService}
                inventoryData={updateModal.data}
            />
        </div>
    );
};

export default SiteInventory;