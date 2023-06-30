import React from "react"
import nickGivingPresentation from "../assets/images/nick_giving_presentation.jpg"
import nickBeekeeping from "../assets/images/nick_beekeeping_cropped.png"
import nickSitting from "../assets/images/nick_sitting_cropped.jpg"

import styled from "styled-components"
import animations from "../theme/animations"
import { Link } from "react-router-dom"

//https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preload

const DESKTOP_VIEW_CUTOFF = "650px"
const WIDE_VIEW_CUTOFF = "1050px"
const MAX_IMAGE_CONTAINER_SIZE = "500px"
const IMAGES_WIDTH = "470px"

// PUT HOVER TEXT IN CONTAINER, DISPLAY ON HOVER

const HomeDiv = styled.div`
width: 96vw;
margin-top: 4.5rem;
margin-bottom: 5px;
margin-left: max(2vw, 5px);
margin-right: max(2vw, 5px);  
@media (min-width: ${WIDE_VIEW_CUTOFF}){
  display: grid;
  grid-template-columns: ${MAX_IMAGE_CONTAINER_SIZE} 40%;
  grid-template-rows: auto;
  grid-auto-flow: row dense;
  justify-content: center;
}
@media (min-width: ${DESKTOP_VIEW_CUTOFF}) and (max-width: ${WIDE_VIEW_CUTOFF}) {
  display: grid;
  grid-template-columns: 55vw 40%;
  grid-template-rows: auto;
  grid-auto-flow: row dense;
  justify-content: center;
}
@media (max-width: ${DESKTOP_VIEW_CUTOFF}){
  display: flex;
  flex-flow: column nowrap;
}
`


const ImagesDiv = styled.div`
  max-width: ${MAX_IMAGE_CONTAINER_SIZE};
  max-height: ${MAX_IMAGE_CONTAINER_SIZE};
  @media (min-width: ${DESKTOP_VIEW_CUTOFF}) {
    width: 50vw;
    height: 50vw; 
    align-self: end;
    justify-self: end;
    margin-right: 5vw;
  }
  @media (max-width: ${DESKTOP_VIEW_CUTOFF}) {
    width: 75vw;
    height: 75vw;
  }
  display: grid;
  grid-template-columns: repeat(20, 5%);
  grid-template-rows: repeat(20, 5%);
  place-self: center;
`

//
const AllImages = styled.img`
  border-radius: 50%;
  transition: filter .25s;
  object-fit: cover;
  grid-column: 1;
  grid-row: 1;

  &:hover {
    filter: brightness(30%);
    cursor: pointer;
    }
`

const CentralImage = styled(AllImages)`
  height: 100%;
  width: 100%;
  animation: ${animations.staggeredFadeIn};
  animation-duration: 1.5s;
  will-change: opacity;
`

/*
@media(min-width: 1000px){
  height: 280px;
  width: 280px;
}
@media(min-width: 800px) and (max-width: 1000px){
  height: 240px;
  width: 240px;
}
@media(min-width: 600px) and (max-width: 800px){
  height: 200px;
  width: 200px;
}
@media(max-width: 600px){
  height: 150px;
  width: 150px;
}
*/

const ImageContainer = styled.div`
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 100%;
`

const CentralImageContainer = styled(ImageContainer)`
width: 100%;
grid-column: 9 / span 12;
grid-row: 1 / span 12;
z-index: 1;
grid-template-columns: 1fr;
grid-template-rows: 1fr;
`

const ImageLink = styled(Link)`
  height: 100%;
  width: 100%;
  border-radius: 50%;
  text-decoration: none;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: auto;

  &:hover{
    &.div{
      display: block;
    }
  }
`


const HoverText = styled.div`
  display: none;
  width: 100%;
  height: 100%;
  vertical-align: middle;
  color: white;
  font-size: 25px;
  text-align: center;
  font-family: "Montserrat", sans-serif;
  z-index: 100;
  grid-row: 1;
  grid-column: 1;
  place-self: center;
  pointer-events: none;
`

/*
@media(min-width: 1000px){
  height: 250px;
  width: 250px;
}
@media(min-width: 800px) and (max-width: 1000px){
  height: 230px;
  width: 230px;
}
@media(min-width: 600px) and (max-width: 800px){
  height: 180px;
  width: 180px;
}
@media(max-width: 600px) and (max-width: 800px){
  height: 140px;
  width: 140px;
}
*/

const BiggerImageContainer = styled(ImageContainer)`
  grid-column: 1 / span 10;
  grid-row: 6 / span 10;
  z-index: 2;
`

const BiggerFlankingImage = styled(AllImages)`
grid-column: 1;
grid-row: 1;
  width: 100%;
  height: 100%; 
  max-height: 100%;
  max-width: 100%;
  animation: ${animations.staggeredFadeIn};
  animation-duration: 2s;
  will-change: opacity;
  max-height: 250px;
`

const SmallerImageContainer = styled(ImageContainer)`
  grid-column: 8 / span 9;
  grid-row: 12 / span 9;
  z-index: 3;
`

const SmallerFlankingImage = styled(AllImages)`
  height: 100%;
  width: 100%;
  animation: ${animations.staggeredFadeIn};
  animation-duration: 2.5s;
  will-change: opacity;
`

const IntroductionDiv = styled.div`
  grid-row-template: 33% 34% 33%;
  grid-column-template: 1fr;
  align-self: center;
  justify-self: start;
  margin-left: 0vw;
  margin-right: 0vw;
`

const HelloTextDiv = styled.div`
@media (min-width: ${DESKTOP_VIEW_CUTOFF}){
  margin-bottom: 1.5rem;
  font-size: 40px;
}
@media (max-width: ${DESKTOP_VIEW_CUTOFF}){
  margin-top: .5rem;
  margin-bottom: .5rem;
  font-size: 35px;
}
font-family: 'Montserrat', sans-serif;
font-weight: 300;
  
  color: ${props => props.theme.colors.primary};
`

const ShortBioDiv = styled.div`
font-family: 'Montserrat', sans-serif;
word-break: break-word;
font-weight: 400;
  font-size: 16px;
  color: black;
`

const Home = () => {
  return(
    <HomeDiv>
      <ImagesDiv>
        <CentralImageContainer>
          <ImageLink to="/resume">
            <HoverText>
              RESUMÉ
            </HoverText>
            <CentralImage src={nickGivingPresentation} alt="Nick giving a presentation" />
          </ImageLink>
        </CentralImageContainer>
        <BiggerImageContainer>
          <ImageLink to="/projects">
            <BiggerFlankingImage src={nickBeekeeping} alt="Nick holding a frame of bees" />
          </ImageLink>
        </BiggerImageContainer>
        <SmallerImageContainer>
          <ImageLink to="/blogs">
            <SmallerFlankingImage src={nickSitting} alt="Nick sitting on a couch" />
          </ImageLink>
        </SmallerImageContainer>
      </ImagesDiv>
      <IntroductionDiv>
        <HelloTextDiv>
          {`Hey, I'm `}<b>{`Nick`}</b>{`.`}
        </HelloTextDiv>
        <ShortBioDiv>
          {`Irure ullamco veniam esse excepteur. Amet Lorem veniam velit labore qui. Esse laboris aute enim laborum nisi.
            Irure ullamco veniam esse excepteur. Amet Lorem veniam velit labore qui. Esse laboris aute enim laborum nisi.
            Irure ullamco veniam esse excepteur. Amet Lorem veniam velit labore qui. Esse laboris aute enim laborum nisi.`}
        </ShortBioDiv>
      </IntroductionDiv>
    </HomeDiv>
  )
/*
  return(
    <MobileHomeDiv>
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
    </MobileHomeDiv>
  )
  */
}

export default Home