import { useJobSite } from "../../context/JobSiteContext.jsx";

const useInventoryService = () => {
    const { shedItems, scaffoldItems, shoringItems } = useJobSite();

    const getServiceItems = (service) => {
        if (!service) return [];

        const lowService = service.toLowerCase();
        switch (lowService) {
            case "sidewalk shed":
                return shedItems;
            case "scaffold":
                return scaffoldItems;
            case "shoring":
                return shoringItems;
            default:
                return [];
        }
    };

    const getServiceKey = (service) => {
        return service.toLowerCase() === "sidewalk shed" ? "shed" : service.toLowerCase();
    };

    return { getServiceItems, getServiceKey };
};

export default useInventoryService;