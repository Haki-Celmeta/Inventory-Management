import {X, Plus, Check, ArrowLeft} from 'lucide-react'
import {capitalizeEachWord, lightColor, mediumColor} from "../utils.js";
import "./button.css"

const Button = ({variant = 'default', colorTone = 'medium'}) => {
    const iconSize = 20

    const config = {
        create: {
            text: capitalizeEachWord("create"),
            icon: <Plus size={iconSize} data-testid="plus-icon" data-size={iconSize} />,
            color: colorTone === "light" ? lightColor('green') : mediumColor('green'),
        },
        save: {
            text: capitalizeEachWord("save changes"),
            icon: <Check size={iconSize} data-testid="check-icon" data-size={iconSize} />,
            color: colorTone === "light" ? lightColor('green') : mediumColor('green'),
        },
        cancel: {
            text: capitalizeEachWord("cancel changes"),
            icon: <X size={iconSize} data-testid="x-icon" data-size={iconSize} />,
            color: colorTone === "light" ? lightColor('red') : mediumColor('red'),
        },
        back: {
            text: capitalizeEachWord("go back"),
            icon: <ArrowLeft size={iconSize} data-testid="arrow-left-icon" data-size={iconSize} />,
            color: colorTone === "light" ? lightColor('blue') : mediumColor('blue'),
        },
        default: {
            text: capitalizeEachWord("button"),
            icon: null,
            color: colorTone === "light" ? lightColor('green') : mediumColor('green'),
        }
    };

    const { text, icon, color } = config[variant] || {};

    return (
        <button
            className={'button'}
            style={{backgroundColor: color}}
        >
            <span>{text}</span>
            {icon !== null && <span data-testid={'icon'}>{icon}</span>}
        </button>
    )
}

export default Button