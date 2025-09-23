import {createContext, useContext, useState} from "react";
import {convertArrayToObject, extraLightColor, mediumColor} from "../utils.js";

const JobSiteContext =  createContext({
    data: [],
    categoryItems: [],
    statusItems: [],
    shedItems: [],
    scaffoldItems: [],
    shoringItems: [],
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
                    item: "Item shed 1",
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

    // service background color
    let serviceColor = '#2e2e2e'

    // sidewalk shed items to choose
    const shedItems = [
        {label: "Item shed 1", color: serviceColor},
        {label: "Item shed 2", color: serviceColor},
        {label: "Item shed 3", color: serviceColor},
    ]
    // scaffold items to choose
    const scaffoldItems = [
        {label: "Item scaffold 1", color: serviceColor},
        {label: "Item scaffold 2", color: serviceColor},
        {label: "Item scaffold 3", color: serviceColor},
    ]
    // shoring items to choose
    const shoringItems = [
        {label: "Item shoring 1", color: serviceColor},
        {label: "Item shoring 2", color: serviceColor},
        {label: "Item shoring 3", color: serviceColor},
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

        const convertedCategories = convertArrayToObject(categories)

        // new job site object to be added
        const newJobSite = {
            id: nextJobSiteId,
            address: jobSiteData.address || '',
            status: jobSiteData.status || 'on hold',
            categoryIncluded: convertedCategories,
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
        shedItems,
        scaffoldItems,
        shoringItems,
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