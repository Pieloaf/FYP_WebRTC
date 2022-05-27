import { css } from "styled-components";
import theme from "./theme";

const mixins = {
    fill: css`
        width: -webkit-fill-available;
        width: -moz-available;
    `,

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
    width: -webkit-fill-available;
    margin: 16px 32px 0; 
    max-width: ${({ width }) => `${width || "fit-content"}`};
    transition: ${theme.transition};
    :hover{
        cursor: pointer;
        transform: scale(1.1);
    }
`,
}

export default mixins;

