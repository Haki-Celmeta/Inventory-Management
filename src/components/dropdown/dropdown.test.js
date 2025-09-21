import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Dropdown from "./Dropdown.jsx"
import {darkColor, extraLightColor, lightColor} from "../utils.js";

describe('Dropdown component', () => {
    it('renders dropdown', () => {
        render(<Dropdown
            isRadio={true}
            withArrow={false}
            displayColor={true}
            color={'var(--light-green)'} />
        );


    })
})