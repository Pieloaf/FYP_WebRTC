import { createGlobalStyle } from "styled-components";
import theme from "./theme";

const GlobalStyle = createGlobalStyle`
    a {
        text-decoration: none;
        :visited, 
        :-webkit-any-link {
            color: ${theme.colours.darkBlue};
        }
    }
    ul
    {
        margin: 0;
        padding: 0;
    }

     li {
        list-style: none;
    }
`
export default GlobalStyle;