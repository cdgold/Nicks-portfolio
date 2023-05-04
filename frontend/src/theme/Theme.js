/* eslint-disable react/prop-types */
import React from "react"
import { ThemeProvider } from "styled-components"

const themeProps = {
  colors: {
    primary: "#c88aff",
    secondary: "#9748f7",
    tertiary: "#681de0",
    quaternary: "#3d038a",
    primaryLighter: "#d19cff",
    primaryLightest: "#e1bfff",
    primaryDarker: "#bd73ff",
    softBackground: "#fbdeff",
    hardBackground: "#b861ff",
    lightGray: "#d6d6d6",
    darkGray: "#8c8c8c",
    baseBackground: "#f2f2f2",
    beige: "#FFF8E7",
    eggCream: "#f5f1b5",
    darkCream: "#fff896",
    lightOrange: "#ffda73",
    darkOrange: "#de8b04",
  },
  fonts: ["sans-serif", "Roboto"],
  fontSizes: {
    small: "1em",
    medium: "2em",
    large: "3em"
  }
}

const Theme = ({ children }) => (
  <ThemeProvider theme={themeProps}>
    {children}
  </ThemeProvider>
)



export { Theme as default, themeProps }