import "./styles/tableOfSites.css"
import {capitalizeEachWord, darkColor, extraLightColor, lightColor} from "../utils.js";
import {useJobSite} from "../context/JobSiteContext.jsx";
import {Link} from "react-router-dom";

/**
 * Table component displaying jobsites in reverse chronological order.
 * Shows jobsite names as clickable links and status with color badges.
 * @param {Array} jobsites - Array of jobsite objects to display
 */
const TableOfSites = ({jobsites}) => {
    const {isStatusValid} = useJobSite()

    // Select color switch
    const selectColor = (item) => {
        switch(item.toLowerCase()) {
            case 'completed':
                return darkColor("green");
            case 'on hold':
                return lightColor("yellow");
            case 'in progress':
                return extraLightColor("green");
            default:
                return "#fff"
        }
    }

    const reverseJobSites = () => {
        const arr = []

        for(let i = jobsites.length - 1; i >= 0; i--) {
            arr.push(jobsites[i]);
        }

        return arr;
    }

    return (
        <table className={'jobsite-table'}>
            <thead>
                <tr>
                    <th>Jobsite Name</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {reverseJobSites().map((jobsite) => (
                    <tr key={jobsite.id}>
                        <td>
                            <Link to={`/jobsites/${jobsite.id}`}>
                                {jobsite.address}
                            </Link>
                        </td>
                        <td className={'status-container'}>
                            <div
                                className={'jobsite-status'}
                                style={{backgroundColor: isStatusValid(jobsite.status) ? selectColor(jobsite.status) : selectColor('on hold')}}
                            >
                                {isStatusValid(jobsite.status) ? capitalizeEachWord(jobsite.status) : 'Unverified'}
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TableOfSites;