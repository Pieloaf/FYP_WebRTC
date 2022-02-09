import { createGlobalStyle } from "styled-components";
import theme from "./theme";

const GlobalStyle = createGlobalStyle`
    a {
        text-decoration: none;
        :visited{
            color: ${theme.colours.darkBlue};
        }
    }
    li {
        list-style: none;
    }
`
export default GlobalStyle;