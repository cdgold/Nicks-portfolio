import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons"

const TEXT_SHRINK_CUTOFF = "500px"

const ModalDiv = styled.div`
    padding: 20px;
    max-height: 80vh;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 20;
    transform: translate(-50%, -50%);
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.baseBackground};
    box-shadow: 0 0 0 max(100vh, 100vw) rgba(0, 0, 0, .5);
    overflow: auto;
    @media (min-width: ${TEXT_SHRINK_CUTOFF}){
        font-size: 15px;
        width: 60vw;
    }
    @media (max-width: ${TEXT_SHRINK_CUTOFF}){
    font-size: 12px;
    width: 80vw;
    }
      
`

const CloseButton = styled.div`
  text-align: right;
  padding-right: 1.5rem;
  @media (min-width: ${TEXT_SHRINK_CUTOFF}){
    font-size: 20px;
  }
  @media (max-width: ${TEXT_SHRINK_CUTOFF}){
    font-size: 14px;
  }
  
  &:hover{
    cursor: pointer;
  }
`

const BlogTitle = styled.div`
  @media (min-width: ${TEXT_SHRINK_CUTOFF}){
    font-size: 24px;
  }
  @media (max-width: ${TEXT_SHRINK_CUTOFF}){
    font-size: 20px;
  }
  font-weight: bold;
  margin-bottom: .5rem;
`

const Blogs = ({ blog, setIsOpen, isOpen }) => {
  if (isOpen && blog !== null && typeof blog.title !== "undefined"){
    return(
      <ModalDiv>
        <CloseButton onClick={ () => setIsOpen(false) }>
          <FontAwesomeIcon icon={faRectangleXmark} />
        </CloseButton>
        <BlogTitle> {blog.title} </BlogTitle>
        <em> Written on {blog.writtenOnDate.toLocaleString("en-us", { month: "long", year: "numeric", day: "numeric" })} </em>
        <br></br>
        {blog.body}
      </ModalDiv>
    )
  }
  else {
    return null
  }
}

export default Blogs