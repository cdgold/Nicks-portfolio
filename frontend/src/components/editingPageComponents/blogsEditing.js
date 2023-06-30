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

const Blog = ({ blog, deleteBlog }) => {
  const [editMode, setEditMode] = useState(false)

  const reviseBlog = async (newBlog) => {
    newBlog = { ...newBlog, id:blog.id }
    return await blogsService.putBlog(newBlog)
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
          <button onClick={() => deleteBlog(blog)}> delete this blog </button>
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

const BlogsEditing = ({ blogs, setBlogs }) => {

  const handleBlogCreation= async (newBlog) => {
    try{
      const postResponse = await blogsService.postBlog(newBlog)
      return postResponse
    }
    catch (error){
      throw(error)
    }
  }

  const deleteBlog = async (blog) => {
    try {
      await blogsService.deleteBlog(blog)
      const newBlogs = blogs.filter(entry => blog.id !== entry.id)
      setBlogs(newBlogs)
    }
    catch (error) {
      window.alert("Error while deleting blog!")
    }

  }

  if(blogs !== null){
    return(
      <BlogsEditingDiv>
        <BlogForm submitFunction={handleBlogCreation}/>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog}/>)}
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
