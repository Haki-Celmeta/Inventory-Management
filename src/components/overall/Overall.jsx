import "./overall.css"
import {capitalizeEachWord} from "../utils.js";
import {useRef} from "react";
import {useJobSite} from "../context/JobSiteContext.jsx";

/**
 * Individual status card displaying count and label with colored background.
 * @param {number} number - Count to display
 * @param {string} extension - Label text for the card
 * @param {string} color - CSS color variable name for background
 */
const OverallCard = ({number, extension, color}) => {
    const varColor = useRef(`var(--light-${color})`)

    return (
        <div className={'overall-card'} style={{backgroundColor: varColor.current}}>
            <div>{number || 0}</div>
            <div>{capitalizeEachWord(extension)}</div>
        </div>
    )
}

/**
 * Dashboard component displaying job site status overview cards.
 * Shows counts for in-progress, completed, and on-hold job sites.
 */
const Overall = () => {
    const {getStatusCompleted, getStatusInProgress, getStatusOnHold} = useJobSite()

    const completedLength = getStatusCompleted() ? getStatusCompleted().length : 0
    const inProgressLength = getStatusInProgress() ? getStatusInProgress().length : 0
    const onHoldLength = getStatusOnHold() ? getStatusOnHold().length : 0

    return (
        <div className={'overall'}>
            <OverallCard number={inProgressLength} extension={'in progress'} color={"yellow"}/>
            <OverallCard number={completedLength} extension={'completed'} color={"green"}/>
            <OverallCard number={onHoldLength} extension={'on hold'} color={"red"}/>
        </div>
    )
}

export default Overall