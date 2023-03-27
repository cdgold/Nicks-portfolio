import { Link } from "react-router-dom"
import React from "react"
import styled from "styled-components"
import cursive_name from "../assets/images/cursive_name.png"

const HeaderStyled = styled.div`
  position: fixed;
  top: 0px !important;
  left: 0px !important;
  height: 3em;
  width: 100vw;
  background-color: ${props => props.theme.colors.darkOrange};
  overflow:auto;
  text-align:right;
`

const NameImage = styled.img`
  position: fixed;
  left: 0px;
  padding-top: .5em;
  padding-left: .5em;
  height: 2em;
`

const StyledLink = styled(Link)`
  color: white;
  textDecoration: none;
  padding-top: 1em;
`


const Header = () => {
  return(
    <HeaderStyled>
      <Link to="/" >
        <NameImage src={cursive_name} alt="Nick Giotis in cursive"/>
      </Link>
      <StyledLink to="/projects">{"Projects"}</StyledLink> {" | "}
      <StyledLink to="/resume" style={{ "padding-right": "4vw" }}>{"Resume"}</StyledLink>
    </HeaderStyled>
  )
}

export default Header