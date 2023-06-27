import React from "react"
import styled from "styled-components"

const BlogDiv = styled.div`
  margin-top: 4em;
  margin-left: 1em;
`

// MODAL ON CLICK?

const Blog = ({ blog }) => {
  console.log(blog)
  return(
    <BlogDiv>
      {blog.title} <br></br>
      Posted on: {blog.writtenOnDate.getMonth() + 1} / {blog.writtenOnDate.getDate()} / {blog.writtenOnDate.getFullYear()}  <br></br>
      Content: {blog.body}
    </BlogDiv>
  )
}

export default Blog