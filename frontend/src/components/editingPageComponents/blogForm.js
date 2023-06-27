import React, { useState, useEffect } from "react"
import NotificationMessage from "./notificationMessage"
import styled from "styled-components"

const EntryText = styled.label`
place-self: center;
`

const EntryInput = styled.input`

`

const BlogFormDiv = styled.form`
display: grid;
grid-template-columns: 10em 20em;
row-gap: 1px;
`

const BlogForm = ({ blog=null, submitFunction }) => {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [writtenOnDate, setWrittenOnDate] = useState("")
  const [messageColor, setMessageColor] = useState("black")
  const [message, setMessage] = useState("")

  useEffect(() => {
    if(blog !== null){
      setTitle(blog.title)
      setBody(blog.body)
      setWrittenOnDate(blog.writtenOnDate)
    }
  }, [blog])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (title === "") {
      setMessageColor("red")
      setMessage("Blogs require a title.")
      return
    }
    const rightNow = new Date()
    let newBlog = {
      title: title,
      body: body,
      writtenOnDate: rightNow.toString()
    }
    //console.log("Sending blog: ", newBlog, " off to blogService")
    submitFunction(newBlog)
      .then(submitResponse => {
        setMessageColor("green")
        setMessage(`Success! ${title} has been submitted.`)
        setTimeout(() => {setMessage("")}, 5000)
      })
      .catch((error) => {
        setMessageColor("red")
        setMessage(`Unknown submission error.`)
        setTimeout(() => {setMessage("")}, 5000)
      })
  }
  return(
    <div>
      <NotificationMessage message={message} setMessage={setMessage} messageColor={messageColor} />
      <BlogFormDiv onSubmit={handleSubmit}>
        <EntryText style={{ gridColumn: 1, gridRow: 1 }}> {"Title of blog:"}         </EntryText>
        <input
          name="title"
          type="text"
          style={{ gridColumn: 2, gridRow: 1 }}
          onChange={event => setTitle(event.target.value)}
          value={title}
        />
        <EntryText style={{ gridColumn: 1, gridRow: 2 }}> {"Blog:"} </EntryText>
        <textarea
          name="description"
          cols="50"
          rows="10"
          style={{ gridColumn: 2, gridRow: 2, resize: "none", width: "100%", height: "10em" }}
          onChange={event => setBody(event.target.value)}
          value={body}
        >
        </textarea>
        <button type="submit" style={{ gridColumn: 2, gridRow: 3 }}> submit </button>
      </BlogFormDiv>
    </div>
  )
}

export default BlogForm