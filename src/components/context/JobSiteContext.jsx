import {createContext, useContext, useState} from "react";
import {extraLightColor, mediumColor} from "../utils.js";

const JobSiteContext =  createContext({
    data: [],
    categoryItems: [],
    statusItems: [],
    getValidStatus: () => {},
    isStatusValid: () => {},
    addJobSite: () => {},
    getJobSite: () => {},
    addInventory: () => {},
    removeInventory: () => {},
    updateInventory: () => {},
    updateJobSite: () => {},
    removeJobSite: () => {},
    getStatusOnHold: () => {},
    getStatusInProgress: () => {},
    getStatusCompleted: () => {},
    nextId: 1
});

const JobSiteProvider = ({children}) => {
    const [data, setData] = useState([
        {
            id: 1,
            address: '123 E 34th, New York',
            status: 'in progress',
            categoryIncluded: {
                shed: [{
                    id: 1,
                    item: "Item 1",
                    quantity: 4,
                    description: "sjjfioiej jfoiesj ifjefje f",
                    notes: "ajsdoijfsjfjjfje"
                }],
                scaffold: [],
                shoring: []
            }
        }
    ]);
    const [nextJobSiteId, setNextJobSiteId] = useState(2);
    const [nextInventoryId, setNextInventoryId] = useState(2);

    // all categories available
    const categoryItems = [
        {label: "Sidewalk Shed", color: mediumColor('green')},
        {label: "Scaffold", color: mediumColor('yellow')},
        {label: "Shoring", color: "var(--purple)"},
    ]

    // all status of job site available
    const statusItems = [
        {label: "Completed", color: mediumColor('green')},
        {label: "On Hold", color: mediumColor('yellow')},
        {label: "In Progress", color: extraLightColor('green')},
    ]

    // Valid Status
    const getValidStatus = () => {
        return statusItems.map(status => status.label.toLowerCase())
    }

    // Check if a given status is true or false
    const isStatusValid = (status) => {
        if(!status) return false
        const validStatuses = getValidStatus()
        return validStatuses.includes(status)
    }

    // Add job site to data
    const addJobSite = (jobSiteData) => {
        // filter category
        const categories = jobSiteData.categories.map(category => {
            if(category.toLowerCase() === "sidewalk shed") {
                return "shed"
            }
            return category.toLowerCase()
        })

        // it creates an object with fields of empty array
        const createObject = (types) => {
            const obj = {}

            for(let i = 0; i < types.length; i++) {
                obj[types[i]] = []
            }

            return obj
        }

        // new job site object to be added
        const newJobSite = {
            id: nextJobSiteId,
            address: jobSiteData.address || '',
            status: jobSiteData.status || 'on hold',
            categoryIncluded: createObject(categories),
            ...jobSiteData
        };

        // Update the jobsites data
        setData(prevData => [...prevData, newJobSite]);
        // Increase the jobsite id
        setNextJobSiteId(prev => prev + 1);
    };

    // Get the job site data by a given id
    const getJobSite = (id) => {
        if(typeof id !== 'number') return null;
        if(id < 0) return null;

        return data.filter(d => d.id === id)
    }

    // It adds an inventory in a given inventory category
    const addInventory = (jobSiteId, category, inventoryData) => {
        // Get jobsite
        const jobsite = getJobSite(jobSiteId);
        if(!jobsite) return false;

        // New inventory object
        const newInventoryItem = {
            id: nextInventoryId,
            item: inventoryData.item || '',
            quantity: inventoryData.quantity || 0,
            description: inventoryData.description || '',
            notes: inventoryData.notes || '',
            ...inventoryData
        };

        // It adds inventory to data object
        setData(prevData =>
            prevData.map(site =>
                site.id === jobSiteId
                    ? {
                        ...site,
                        categoryIncluded: {
                            ...site.categoryIncluded,
                            [category]: [
                                ...site.categoryIncluded[category],
                                newInventoryItem
                            ]
                        }
                    }
                    : site
            )
        );

        // Increase the inventory id since the previous one is used
        setNextInventoryId(prev => prev + 1);
        return true;
    }

    // It removes inventory for a given category
    const removeInventory = (jobSiteId, category, inventoryId) => {
        // Get the jobsite by id
        const jobsite = getJobSite(jobSiteId);
        if (!jobsite) return false;

        // Remove the inventory
        setData(prevData =>
            prevData.map(site =>
                site.id === jobSiteId
                    ? {
                        ...site,
                        categoryIncluded: {
                            ...site.categoryIncluded,
                            [category]: site.categoryIncluded[category].filter(
                                item => item.id !== inventoryId
                            )
                        }
                    }
                    : site
            )
        );

        return true;
    };

    // It updates the inventory for a given category
    const updateInventory = (jobSiteId, category, inventoryId, updatedData) => {
        // Get jobsite data
        const jobsite = getJobSite(jobSiteId);
        if (!jobsite) return false;

        // Check if inventory exists
        const inventoryExists = jobsite.categoryIncluded[category].some(
            item => item.id === inventoryId
        );

        // If it does not exist then return false
        if (!inventoryExists) return false;

        // Update setData
        setData(prevData =>
            prevData.map(site =>
                site.id === jobSiteId
                    ? {
                        ...site,
                        categoryIncluded: {
                            ...site.categoryIncluded,
                            [category]: site.categoryIncluded[category].map(item =>
                                item.id === inventoryId
                                    ? { ...item, ...updatedData }
                                    : item
                            )
                        }
                    }
                    : site
            )
        );

        return true;
    };

    // Update job site details like address, status, etc.
    const updateJobSite = (jobSiteId, updatedData) => {
        setData(prevData =>
            prevData.map(site =>
                site.id === jobSiteId
                    ? { ...site, ...updatedData, id: jobSiteId }
                    : site
            )
        );
    };

    // Remove jobsite entirely
    const removeJobSite = (jobSiteId) => {
        setData(prevData => prevData.filter(site => site.id !== jobSiteId));
    };

    // Get only with jobsite with status 'on hold'
    const getStatusOnHold = () => {
        return data.filter(item => item.status.toLowerCase() === 'on hold') || null
    }

    // Gets only the jobsites with status 'in progress'
    const getStatusInProgress = () => {
        return data.filter(item => item.status.toLowerCase() === 'in progress') || null
    }

    // Gets only the jobsites with status 'completed'
    const getStatusCompleted = () => {
        return data.filter(item => item.status.toLowerCase() === 'completed') || null
    }

    const value = {
        data,
        categoryItems,
        statusItems,
        getValidStatus,
        isStatusValid,
        addJobSite,
        getJobSite,
        addInventory,
        removeInventory,
        updateInventory,
        updateJobSite,
        removeJobSite,
        getStatusOnHold,
        getStatusInProgress,
        getStatusCompleted,
        nextJobSiteId,
        nextInventoryId
    }

    return (
        <JobSiteContext.Provider value={value}>
            {children}
        </JobSiteContext.Provider>
    )
}

export const useJobSite = () => {
    const context = useContext(JobSiteContext);
    if (!context) {
        throw new Error('useJobSite must be used inside JobSiteProvider');
    }
    return context;
};

export default JobSiteProvider;