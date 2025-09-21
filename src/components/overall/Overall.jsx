import "./overall.css"
import {capitalizeEachWord} from "../utils.js";
import {useRef} from "react";

const OverallCard = ({number, extension, color}) => {
    const varColor = useRef(`var(--light-${color})`)

    return (
        <div className={'overall-card'} style={{backgroundColor: varColor.current}}>
            <div>{number}</div>
            <div>{capitalizeEachWord(extension)}</div>
        </div>
    )
}

const Overall = () => {
    return (
        <div className={'overall'}>
            <OverallCard number={14} extension={'in progress'} color={"yellow"}/>
            <OverallCard number={3} extension={'completed'} color={"green"}/>
            <OverallCard number={2} extension={'on hold'} color={"red"}/>
        </div>
    )
}

export default Overall