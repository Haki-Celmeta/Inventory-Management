import "./tableOfSites.css"
import Dropdown from "../dropdown/Dropdown.jsx";
import {capitalizeEachWord, darkColor, extraLightColor, lightColor} from "../utils.js";
import {useJobSite} from "../context/JobSiteContext.jsx";

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

    return (
        <table className={'jobsite-table'}>
            <thead>
                <tr>
                    <th>Jobsite Name</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {jobsites.map((jobsite) => (
                    <tr key={jobsite.id}>
                        <td>{jobsite.address}</td>
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