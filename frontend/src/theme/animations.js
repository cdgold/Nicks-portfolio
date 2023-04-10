import styled, { keyframes } from "styled-components"

const fadeIn = keyframes`
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }  
`

const staggeredFadeIn = keyframes`
  0%{
    opacity: 0;
  }
  50%{
    opacity: .15;
  }  
  100%{
    opacity: 1;
  }  
`
const animations = {
  fadeIn,
  staggeredFadeIn
}

export default animations