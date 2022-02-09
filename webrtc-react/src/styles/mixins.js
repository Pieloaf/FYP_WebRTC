import { css } from "styled-components";
import theme from "./theme";

const mixins = {
    flexCentre: css`
    display: flex;
    align-items: center;
    justify-content: center;
`,
    interactive: css`
    border-radius: 61px;
    font-weight: bold;
    font-size: ${({ fSize }) => `${fSize || theme.fontSizes.lg}`};
    color: ${({ color }) => `${color || theme.colours.darkBlue}`};
    background-color: ${({ bgColor }) => `${bgColor || theme.colours.white}`};
    width: fit-content;
    margin: 16px 32px 0; 
    max-width: ${({ width }) => `${width || "fit-content"}`};
    @media screen and (max-width: 499px) {
        
        width: auto;
    }
`,
}

export default mixins