import React from "react"
import nickGivingPresentation from "../assets/images/nick_giving_presentation.jpg"
import styled from "styled-components"
import animations from "../theme/animations"

const IMAGES_WIDTH = "470px"

const HomeDiv = styled.div`
  width: 96vw;
  min-width: 700px;
  height: 600px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: max(2vw, 5px);
  margin-right: max(2vw, 5px);  
  display: grid;
  grid-template-columns: minmax(${IMAGES_WIDTH}, 55%) 45%;
  grid-auto-flow: row dense;
`

const ImagesDiv = styled.div`
  width: ${IMAGES_WIDTH};
  height: 460px;
  display: grid;
  grid-template-columns: 10% 10% 10% 10% 10% 10% 10% 10% 10% 10%;
  grid-template-rows: 10% 10% 10% 10% 10% 10% 10% 10% 10% 10%;
  place-self: center;
`

const AllImages = styled.img`
  border-radius: 50%;
`

const CentralImage = styled(AllImages)`
  height: 280px;
  width: 280px;
  grid-column: 5;
  grid-row: 1;
  z-index: 1;
  animation: ${animations.staggeredFadeIn};
  animation-duration: 1.5s;
  will-change: opacity;
`

const BiggerFlankingImage = styled(AllImages)`
height: 250px;
width: 250px;
grid-column: 1;
grid-row: 3;
z-index: 2;
animation: ${animations.staggeredFadeIn};
animation-duration: 2s;
will-change: opacity;
`

const SmallerFlankingImage = styled(AllImages)`
  height: 230px;
  width: 230px;
  grid-column: 4;
  grid-row: 6;
  z-index: 3;
  animation: ${animations.staggeredFadeIn};
animation-duration: 2.5s;
will-change: opacity;
`

const IntroductionDiv = styled.div`
  display: grid;
  grid-row-template: 33% 34% 33%;
  grid-column-template: 1fr;
  place-self: center;
  margin-left: 10px;
  margin-right: 10px;
`

const HelloTextDiv = styled.div`
  color: ${props => props.theme.colors.primary}
`

const ShortBioDiv = styled.div`
  
`

const Home = () => {
  return(
    <HomeDiv>
      <ImagesDiv>
        <CentralImage src={nickGivingPresentation} alt="Nick giving a presentation" />
        <BiggerFlankingImage src={nickGivingPresentation} alt="Nick giving a presentation" />
        <SmallerFlankingImage src={nickGivingPresentation} alt="Nick giving a presentation" />
      </ImagesDiv>
      <IntroductionDiv>
        <HelloTextDiv>
          <p><b>{`Hey, I'm Nick.`}</b></p>
        </HelloTextDiv>
        <ShortBioDiv>
          <p>{`Irure ullamco veniam esse excepteur. Amet Lorem veniam velit labore qui. Esse laboris aute enim laborum nisi.
          Irure ullamco veniam esse excepteur. Amet Lorem veniam velit labore qui. Esse laboris aute enim laborum nisi.
          Irure ullamco veniam esse excepteur. Amet Lorem veniam velit labore qui. Esse laboris aute enim laborum nisi.`}</p>
        </ShortBioDiv>
      </IntroductionDiv>
    </HomeDiv>
  )
}

export default Home