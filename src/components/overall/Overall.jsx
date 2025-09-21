import "./overall.css"
import {capitalizeEachWord} from "../utils.js";
import {useContext, useRef} from "react";
import JobSiteContext, {useJobSite} from "../context/JobSiteContext.jsx";

const OverallCard = ({number, extension, color}) => {
    const varColor = useRef(`var(--light-${color})`)

    return (
        <div className={'overall-card'} style={{backgroundColor: varColor.current}}>
            <div>{number || 0}</div>
            <div>{capitalizeEachWord(extension)}</div>
        </div>
    )
}

const Overall = () => {
    const {getStatusCompleted, getStatusInProgress, getStatusOnHold} = useJobSite()

    const completedLength = getStatusCompleted().length
    const inProgressLength = getStatusInProgress().length
    const onHoldLength = getStatusOnHold().length

    return (
        <div className={'overall'}>
            <OverallCard number={inProgressLength} extension={'in progress'} color={"yellow"}/>
            <OverallCard number={completedLength} extension={'completed'} color={"green"}/>
            <OverallCard number={onHoldLength} extension={'on hold'} color={"red"}/>
        </div>
    )
}

export default Overall