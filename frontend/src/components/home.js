import React from "react"
import nickGivingPresentation from "../assets/images/nick_giving_presentation.jpg"
import styled from "styled-components"
import animations from "../theme/animations"
import { Link } from "react-router-dom"

//https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preload

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
  transition: filter .25s;

  &:hover {
    filter: brightness(60%);
    cursor: pointer;
    }
`

const CentralImage = styled(AllImages)`
height: 280px;
width: 280px;
  animation: ${animations.staggeredFadeIn};
  animation-duration: 1.5s;
  will-change: opacity;
`

const CentralImageContainer = styled.div`
height: 280px;
width: 280px;
grid-column: 5;
grid-row: 1;
z-index: 1;
grid-template-columns: 1fr;
grid-template-rows: 1fr;

`

const CentralImageLink = styled(Link)`
height: 100%;
width: 100%;
border-radius: 50%;
`


const HoverText = styled.div`
color: white;
font-size: 20px;
position: absolute;
top: 50%;
left: 50%;
text-align: center;
z-index: 10;
`

const BiggerFlankingImage = styled(AllImages)`
height: 250px;
width: 250px;
animation: ${animations.staggeredFadeIn};
animation-duration: 2s;
will-change: opacity;
`

const BiggerImageLink = styled(Link)`
height: 250px;
width: 250px;
border-radius: 50%;
grid-column: 1;
grid-row: 3;
z-index: 2;
`

const SmallerFlankingImage = styled(AllImages)`
  height: 230px;
  width: 230px;
  animation: ${animations.staggeredFadeIn};
animation-duration: 2.5s;
will-change: opacity;
`

const SmallerImageLink = styled(Link)`
grid-column: 4;
grid-row: 6;
z-index: 3;
height: 230px;
width: 230px;
border-radius: 50%;
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
font-family: 'Montserrat', sans-serif;
font-weight: 300;
  font-size: 40px;
  color: ${props => props.theme.colors.primary};
`

const ShortBioDiv = styled.div`
font-family: 'Montserrat', sans-serif;
font-weight: 400;
  font-size: 16px;
  color: black;
`

const Home = () => {
  return(
    <HomeDiv>
      <ImagesDiv>
        <CentralImageContainer>
          <CentralImageLink to="/resume"><CentralImage src={nickGivingPresentation} alt="Nick giving a presentation" />
          </CentralImageLink>
          <HoverText> raga </HoverText>
        </CentralImageContainer>
        <BiggerImageLink to ="/projects"><BiggerFlankingImage src={nickGivingPresentation} alt="Nick giving a presentation" /></BiggerImageLink>
        <SmallerImageLink to="/blogs"><SmallerFlankingImage src={nickGivingPresentation} alt="Nick giving a presentation" /></SmallerImageLink>
      </ImagesDiv>
      <IntroductionDiv>
        <HelloTextDiv>
          <p>{`Hey, I'm `}<b>{`Nick`}</b>{`.`}</p>
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