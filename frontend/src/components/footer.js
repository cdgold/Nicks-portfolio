import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons"

const FooterDiv = styled.div`
  margin-left: 15px;
  height: 20px;
  font-size: 25px;
`

const HrStyled = styled.hr`
  margin-left: 10px;
  width: max(30%, 200px);
  margin-bottom: 10px;
`

const SocialMediaLink = styled.a`
text-decoration: none;
padding-left: 10px;
`

const LinkedInLink = styled(SocialMediaLink)`
  color: blue;

  &:hover {
    color: #0a2f7a;
    transform: translateY(-1px);
  }

  &:active {
    color: black;
  }
`

const InstagramLink = styled(SocialMediaLink)`
color: #921df2;

&:hover {
  color: #640eab;
  transform: translateY(-1px);
}

&:active {
  color: black;
}
`


const Footer = () => {
  return(
    <FooterDiv>
      <HrStyled></HrStyled>
      <p style={{ display: "inline", fontSize: "14px", color:"#7c7e82", paddingLeft: "10px" }}> {`Connect with me here:`}</p>
      <LinkedInLink href="https://www.linkedin.com/in/nicholasgiotis/"><FontAwesomeIcon icon={faLinkedin}></FontAwesomeIcon></LinkedInLink>
      <InstagramLink href="https://www.instagram.com/nickgiotis/?hl=en"><FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon></InstagramLink>
    </FooterDiv>
  )
}

export default Footer