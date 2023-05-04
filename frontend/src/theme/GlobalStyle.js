import { createGlobalStyle } from "styled-components"
import { themeProps } from "./Theme.js"

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Open-Sans, Helvetica, sans-serif;
    background: ${themeProps.colors.baseBackground};
  }

  @font-face {
    font-family: 'Montserrat';
    src: url(https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;400;600&display=swap);
  }
`

export default GlobalStyle