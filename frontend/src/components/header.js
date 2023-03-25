import { Link } from "react-router-dom"
import React from "react"

const Header = () => {
  return(
    <div>
      <Link to="/">{"Home"}</Link> {" | "}
      <Link to="/projects">{"Projects"}</Link> {" | "}
      <Link to="/resume">{"Resume"}</Link>
    </div>
  )
}

export default Header