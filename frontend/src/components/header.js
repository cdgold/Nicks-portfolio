import { Link, useNavigate } from "react-router-dom"
import React, { useState } from "react"
import styled from "styled-components"
// import cursive_name from "../assets/images/cursive_name.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faRectangleXmark } from "@fortawesome/free-solid-svg-icons"

const DESKTOP_VIEW_CUTOFF = "500px"

const openMenuStyles = {
  transform: "translate3d(20vw, 0, 0)",
  boxShadow: "0 0 0 max(100vh, 100vw) rgba(0, 0, 0, .3)"
}

const closedMenuStyles = {
  transform: "translate3d(100vw, 0, 0)",
  boxShadow: "none"
}

const SlidingMenuDiv = styled.div`
  @media (min-width: ${DESKTOP_VIEW_CUTOFF}) {
    display: none;
  }
  position: fixed;
  left: 0;
  top: 0;
  transform: translate3d(100vw, 0, 0);
  width: 80vw;
  height: 100vh;
  background-color: ${props => props.theme.colors.primary};
  z-index: 100;

  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-items: center;
  text-align: center;
  gap: 1.5rem;
  transition: transform .8s cubic-bezier(.15,.5,.3,1), box-shadow .8s cubic-bezier(.15,.5,.3,1);

  font-family: 'Montserrat', sans-serif;
  color: ${props => props.theme.colors.baseBackground};
`

const CloseButton = styled.div`
  text-align: right;
  padding-right: 1.5rem;
  
  &:hover{
    cursor: pointer;
  }
`

const MenuLink = styled.div`
  font-family: 'Montserrat', sans-serif;
`

const SlidingMenu = ({ menuStyling, setMenuStyling, navigate }) => {

  const handleNavigate = (link) => {
    setMenuStyling(closedMenuStyles)
    navigate(link)
  }

  return(
    <SlidingMenuDiv style={menuStyling}>
      <CloseButton onClick={() => setMenuStyling(closedMenuStyles)}>
        <FontAwesomeIcon icon={faRectangleXmark} />
      </CloseButton>
      <MenuLink onClick={() => handleNavigate("/")}>
      Home Page
      </MenuLink>
      <MenuLink onClick={() => handleNavigate("/projects")}>
        Projects
      </MenuLink>
      <MenuLink onClick={() => handleNavigate("/resume")}>
        Resume
      </MenuLink>
      <MenuLink onClick={() => handleNavigate("/blogs")}>
        Blogs
      </MenuLink>
    </SlidingMenuDiv>
  )
}

const HeaderStyled = styled.div`
  position: fixed;
  display: flex;
  justify-content: right;
  align-items: center;
  top: 0;
  left: 0;
  height: 3rem;
  width: 100vw;
  background-color: ${props => props.theme.colors.primary};
  overflow:auto;
  z-index: 10;
`

const NameText = styled.div`
position: absolute;
left: 0px;
top: 0px;
align-self: center;
padding-left: .5rem;
padding-top: .25rem;
height: 2rem;
font-size: 2rem;
font-family: 'Montserrat', sans-serif;
font-weight: 100;
color: ${props => props.theme.colors.baseBackground};

&:hover{
  cursor: pointer;
}
`

const StyledLink = styled(Link)`
@media (max-width: ${DESKTOP_VIEW_CUTOFF}) {
  display: none;
}
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

const NavButton = styled.div`
  @media (min-width: ${DESKTOP_VIEW_CUTOFF}) {
    display: none;
  }
  color: ${props => props.theme.colors.baseBackground};
  margin-left: 1.5rem;
  margin-right: 1.0rem;
  font-size: 20px;

  &:hover{
    cursor: pointer;
    color: ${props => props.theme.colors.secondary};
  }
`


const Header = () => {
  const [menuStyling, setMenuStyling] = useState(closedMenuStyles)

  const navigate = useNavigate()

  return(
    <HeaderStyled>
      <NavButton onClick={ () => setMenuStyling(openMenuStyles) }>
        <FontAwesomeIcon icon={faBars} />
      </NavButton>
      <SlidingMenu menuStyling={menuStyling} setMenuStyling={setMenuStyling} navigate={navigate}/>
      <NameText onClick={() => navigate("/")} >NICK GIOTIS</NameText>
      <StyledLink to="/projects" >{"Projects"}</StyledLink>
      <StyledLink to="/resume">{"Resume"}</StyledLink>
      <StyledLink to="/blogs" style={{ paddingRight: "2em" }}>{"Blogs"}</StyledLink>
    </HeaderStyled>
  )
}

export default Header