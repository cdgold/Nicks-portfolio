import React, { useState } from "react"
import blogsService from "../../services/blogs"
import BlogForm from "./blogForm"
import Togglable from "../../utils/togglable"
import styled from "styled-components"
/*
  title: String,
  description: String,
  fileURL: String,
  fileType: String,
  writtenOnDate: Date
  */


const BlogsEditingDiv = styled.div`
  width: 30em;
`

const BlogDiv = styled.div`
  border-width: thin;
  border: solid;
  margin-bottom: 5px;
`

const Blog = ({ blog }) => {
  const [editMode, setEditMode] = useState(false)

  const reviseBlog = async (newBlog) => {
    newBlog = { ...newBlog, id:blog.id }
    return await blogsService.putBlog(newBlog)
  }

  const deleteBlog = async () => {
    return await blogsService.deleteBlog(blog)
  }

  if (editMode === false){
    return(
      <BlogDiv>
        {`${blog.title}`}
        <Togglable>
          <p>
            {blog.body}
          </p>
          <div>
            Blog created on: {blog.writtenOnDate.toString()} <br></br>
          </div>
          <button onClick={() => setEditMode(!editMode)}> edit this blog </button>
          <button onClick={() => deleteBlog()}> delete this blog </button>
          <br></br>
        </Togglable>
      </BlogDiv>
    )
  }
  else {       // edit mode is true
    return(
      <BlogDiv>
        <BlogForm blog={blog} submitFunction={reviseBlog} />
        <button onClick={() => setEditMode(!editMode)}> stop editing and discard changes </button>
      </BlogDiv>
    )
  }

}

const BlogsEditing = ({ blogs }) => {

  const handleBlogCreation= async (newBlog) => {
    try{
      const postResponse = await blogsService.postBlog(newBlog)
      return postResponse
    }
    catch (error){
      throw(error)
    }
  }
  if(blogs !== null){
    return(
      <BlogsEditingDiv>
        <BlogForm submitFunction={handleBlogCreation}/>
        {blogs.map(blog => <Blog key={blog.id} blog={blog}/>)}
      </BlogsEditingDiv>
    )
  }
  return(
    <BlogsEditingDiv>
      <BlogForm submitFunction={handleBlogCreation}/>
    </BlogsEditingDiv>
  )
}

export default BlogsEditing
