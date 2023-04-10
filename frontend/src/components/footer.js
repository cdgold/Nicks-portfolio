import React from "react"
import styled from "styled-components"

const FooterDiv = styled.div`
  height: 20px;
`

const HrStyled = styled.hr`
  margin-left: 10px;
  width: max(30%, 200px)
`





const Footer = () => {
  return(
    <FooterDiv>
      <HrStyled></HrStyled>
      <a href="https://www.linkedin.com/in/nicholasgiotis/"> LinkedIn </a>
      <a href="https://www.instagram.com/nickgiotis/?hl=en"> Instagram </a>
    </FooterDiv>
  )
}

export default Footer