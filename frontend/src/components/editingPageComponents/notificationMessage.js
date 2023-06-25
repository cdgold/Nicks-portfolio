import React, { useState } from "react"
import styled from "styled-components"

// need states to lift up states to control message and its color

const MessageDiv = styled.div`
    background: azure;
    border: solid;
    border-radius: 5px;
    margin-bottom: 10px;
`

const NotificationMessage = ({ message, messageColor }) => {


  if(message !== null && message !== ""){
    return(
      <div>
        <MessageDiv style={{ color: messageColor, borderColor: messageColor }}>
          {message}
        </MessageDiv>
      </div>
    )
  }
  return(null)
}


export default NotificationMessage