import { Link } from "react-router-dom"
import React from "react"
import styled from "styled-components"
import cursive_name from "../assets/images/cursive_name.png"

const HeaderStyled = styled.div`
  position: fixed;
  display: flex;
  justify-content: right;
  align-items: center;
  top: 0;
  left: 0;
  height: 3em;
  width: 100vw;
  min-width: 400px;
  background-color: ${props => props.theme.colors.primary};
  overflow:auto;
  z-index: 10;
`

const NameText = styled.div`
position: absolute;
left: 0px;
top: 0px;
padding-top: .25em;
padding-left: .5em;
height: 2em;
font-size: 28px;
font-family: 'Montserrat', sans-serif;
font-weight: 100;
color: ${props => props.theme.colors.baseBackground};
`

const NameImage = styled.img`
  position: absolute;
  left: 0px;
  top: 0px;
  padding-top: .5em;
  padding-left: .5em;
  height: 2em;
`

const StyledLink = styled(Link)`
font-family: 'Montserrat', sans-serif;
  color: ${props => props.theme.colors.baseBackground};
  text-decoration: none;
  padding-right: 18px;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`


const Header = () => {
  return(
    <HeaderStyled>
      <Link to="/" >
        <NameText>NICK GIOTIS</NameText>
        {/*<NameImage src={cursive_name} alt="Nick Giotis in cursive"/>*/}
      </Link>
      <StyledLink to="/projects" >{"Projects"}</StyledLink>
      <StyledLink to="/resume">{"Resume"}</StyledLink>
      <StyledLink to="/blogs" style={{ paddingRight: "2em" }}>{"Blogs"}</StyledLink>
    </HeaderStyled>
  )
}

export default Header