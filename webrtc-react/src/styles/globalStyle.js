import { createGlobalStyle } from "styled-components";
import theme from "./theme";

const GlobalStyle = createGlobalStyle`
    /* remove link high lighting */
    a {
        text-decoration: none;
        :visited, 
        :-webkit-any-link {
            color: ${theme.colours.darkBlue};
        }
    }
    /* remove defualt list styles */
    ul
    {
        margin: 0;
        padding: 0;
    }

     li {
        list-style: none;
    }

    /* hide media controls for streams*/
    video::-webkit-media-controls {
        display: none;
    }
`
export default GlobalStyle;