/* eslint-disable react/prop-types */
import React from "react"
import { ThemeProvider } from "styled-components"

const theme = {
  colors: {
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
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
)



export default Theme