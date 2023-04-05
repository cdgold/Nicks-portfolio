import React from "react"
import nickGivingPresentation from "../assets/images/nick_giving_presentation.jpg"
import styled from "styled-components"


const HomeDiv = styled.div`
  width: 80vw;
  height: 600px;
  position: relative;
`

const AllImages = styled.img`
  border-radius: 50%;
`

const CentralImage = styled(AllImages)`
  height: 40%;
`

const BiggerFlankingImage = styled(AllImages)`
  height: 35%;
`

const SmallerFlankingImage = styled(AllImages)`
  width: 30%;
`

const Home = () => {
  return(
    <HomeDiv>
      <CentralImage src={nickGivingPresentation} alt="Nick giving a presentation" />
      <BiggerFlankingImage src={nickGivingPresentation} alt="Nick giving a presentation" />
      <SmallerFlankingImage src={nickGivingPresentation} alt="Nick giving a presentation" />
      <h2>
        {`Hi! I'm Nick`}
      </h2>
    </HomeDiv>
  )
}

export default Home