import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

const BlogsDiv = styled.div`
  margin-top: 4em;
  margin-left: 1em;
`

const Blogs = ({ blogs }) => {
  return(
    <BlogsDiv>
      {blogs.map(blog => <Link key={blog.id} to={`/blogs/${blog.id}`}> {blog.title} </Link>)}
    </BlogsDiv>
  )
}

export default Blogs