import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"

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

const EmailLink = styled.button`
all: unset;
text-decoration: none;
padding-left: 10px;
color: ${props => props.theme.colors.primary};

&:hover {
  color: ${props => props.theme.colors.secondary};
  transform: translateY(-1px);
  cursor: pointer;
}

&:active {
  color: ${props => props.theme.colors.tertiary};
}
`


const Footer = () => {
  return(
    <FooterDiv>
      <HrStyled></HrStyled>
      <p style={{ display: "inline", fontSize: "14px", color:"#7c7e82", paddingLeft: "10px" }}> {`Connect with me here:`}</p>
      <LinkedInLink href="https://www.linkedin.com/in/nicholasgiotis/"><FontAwesomeIcon icon={faLinkedin}></FontAwesomeIcon></LinkedInLink>
      <InstagramLink href="https://www.instagram.com/nickgiotis/?hl=en"><FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon></InstagramLink>
      <EmailLink onClick={() => {
        try{
          navigator.clipboard.writeText("nsgiotis@gmail.com")
          window.alert("Copied e-mail (nsgiotis@gmail.com) to your clipboard.")
        } catch(error) {
          window.alert("Could not copy e-mail (nsgiotis@gmail.com) to your clipboard.")
        }
      }}><FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon></EmailLink>
    </FooterDiv>
  )
}

export default Footer