import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]
const MAX_TITLE_LENGTH = 60

const BlogsDiv = styled.div`
  margin-top: 4em;
  margin-left: 1em;
  margin-right: 1em;
  display: grid;
  align-content: center;
  justify-content: center;
  min-width: 800px;
`

const CalendarContainer = styled.div`
  display: flex;
  width: 800px;
  flex-wrap: wrap;
  font-family: "Source Sans Pro", sans-serif;
`

const CalendarDayHeader = styled.li`
  list-style: none;
  width: calc(100% / 7);
  padding-bottom: 10px;
  text-align: center;
`

const CalendarListElement = styled(CalendarDayHeader)`
background-color: ${props => props.theme.colors.softBackground};
height: 80px;
text-align: left;
box-sizing: border-box;
border: 1px solid;
border-color: ${props => props.theme.colors.quaternary};
`

const ClickableCalendarListElement = styled(CalendarListElement)`
background-color: ${props => props.theme.colors.hardBackground};
width: calc(100% / 7);
&:hover {
  filter: brightness(60%);
  cursor: pointer;
  }
`

const DayNumberDiv = styled.div`
  float: left;
  background-color: ${props => props.theme.colors.secondary};
  color: white;
  width: 1.25em;
  padding: 1px;
  text-align: center;
`

const CalendarDayText = styled.div`
  font-size: 14px;
  color: white;
`

const CalendarButton = styled.button`
  background-color: ${props => props.theme.colors.secondary};
  border: 1px solid transparent;
border-radius: 0.25rem;
color: white;
width: 20px;

&:hover,
&:focus {
background-color: ${props => props.theme.colors.tertiary};
box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
}

&:hover {
transform: translateY(-1px);
}

&:active {
background-color: ${props => props.theme.colors.quaternary};
box-shadow: rgba(0, 0, 0, .06) 0 2px 4px;
transform: translateY(0);
} 
`

const MonthYearText = styled.div`
width: 100%;
text-align: center;
`

const CalendarDay = ({ dayNumber, month, isCurrentMonth, blog }) => {
  let blockStyle = {}
  if(!isCurrentMonth){
    blockStyle = { ...blockStyle, "opacity": "40%" }
  }
  if(!blog){
    return(
      <CalendarListElement style={blockStyle}>
        <DayNumberDiv>
          {dayNumber}
        </DayNumberDiv>
      </CalendarListElement>
    )
  }


  let displayTitle = blog.title
  console.log(displayTitle.length)
  if (displayTitle.length > MAX_TITLE_LENGTH){
    displayTitle = displayTitle.slice(0, (MAX_TITLE_LENGTH - 3)) + "..."
  }

  return(
    <Link to={`/blogs/${blog.id}`} style={{ display: "inline-block", textDecoration: "none", width: "calc(100% / 7)" }}>
      <ClickableCalendarListElement  style={ { width: "100%" } }>
        <DayNumberDiv>
          {dayNumber}
        </DayNumberDiv>
        <CalendarDayText>
          {displayTitle}
        </CalendarDayText>
      </ClickableCalendarListElement>
    </Link>
  )
}

const Blogs = ({ blogs }) => {
  const [viewedDates, setViewedDates] = useState([])
  const [firstDateOfViewedMonth, setFirstDateOfViewedMonth] = useState(new Date())
  const [blogsInThisMonth, setBlogsInThisMonth] = useState([])

  const refreshViewDates = () => {
    const newViewedDates = []
    const firstOfMonth = new Date(firstDateOfViewedMonth.getFullYear(), firstDateOfViewedMonth.getMonth(), 1)
    const lastOfMonth = new Date(firstDateOfViewedMonth.getFullYear(), firstDateOfViewedMonth.getMonth() + 1, 0)
    let currentDateItr = new Date(firstOfMonth)
    let prevMonthValues = []
    while (currentDateItr.getDay() !== 0){
      currentDateItr.setDate(currentDateItr.getDate() - 1)
      prevMonthValues = prevMonthValues.concat(currentDateItr.getDate())
    }
    while (prevMonthValues.length !== 0){
      newViewedDates.push(prevMonthValues.pop())
    }
    let dateItr = 1
    while (dateItr - 1 !== lastOfMonth.getDate()){
      newViewedDates.push(dateItr)
      dateItr++
    }
    currentDateItr = lastOfMonth
    while (currentDateItr.getDay() !== 6){
      currentDateItr.setDate(currentDateItr.getDate() + 1)
      newViewedDates.push(currentDateItr.getDate())
    }
    setViewedDates(newViewedDates)
    const blogsInThisMonth = blogs.filter(blog => (blog.writtenOnDate.getMonth() === firstDateOfViewedMonth.getMonth()
      && blog.writtenOnDate.getFullYear() === firstDateOfViewedMonth.getFullYear()))
    console.log(blogsInThisMonth)
    setBlogsInThisMonth(blogsInThisMonth)
  }

  const incrementMonth = () => {
    const incrementedMonthDate = new Date(firstDateOfViewedMonth.setMonth(firstDateOfViewedMonth.getMonth()+1))
    setFirstDateOfViewedMonth(incrementedMonthDate)
    refreshViewDates()
  }

  const decrementMonth = () => {
    const decrementedMonthDate = new Date(firstDateOfViewedMonth.setMonth(firstDateOfViewedMonth.getMonth()-1))
    setFirstDateOfViewedMonth(decrementedMonthDate)
    refreshViewDates()
  }

  useEffect(() => { // calculating which days to display (viewedDates)

    const currentDate = new Date()
    const firstOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    setFirstDateOfViewedMonth(firstOfCurrentMonth)
    refreshViewDates()
  }, [blogs])

  return(
    <BlogsDiv>
      <CalendarContainer>
        <MonthYearText> {firstDateOfViewedMonth.toLocaleString("default", { month: "long" })} {firstDateOfViewedMonth.getFullYear()}</MonthYearText>
        {daysOfWeek.map(day => <CalendarDayHeader key={day}>{day}</CalendarDayHeader>)}
        {viewedDates.map((date, itr) => {
          let isCurrentMonth = true
          if((itr < 7 && date>25) || (date < 7 && itr>25)){
            isCurrentMonth = false
          }
          let matchedBlog = null
          for(const itr in blogsInThisMonth){
            const blog=blogsInThisMonth[itr]
            if(blog.writtenOnDate.getDate() === date){
              if(isCurrentMonth === true){
                if(blog.writtenOnDate.getMonth() === firstDateOfViewedMonth.getMonth()){
                  matchedBlog = blog
                  console.log("match!")
                }
              }
              else{
                if(blog.writtenOnDate.getMonth() === firstDateOfViewedMonth.getMonth() - 1 || (blog.writtenOnDate.getMonth() === firstDateOfViewedMonth.getMonth() + 1)){
                  matchedBlog = blog
                  console.log("match!")
                }
              }
            }
          }
          return(<CalendarDay key={itr} dayNumber={date} isCurrentMonth={isCurrentMonth}
            blog={matchedBlog} month={firstDateOfViewedMonth.getMonth()} ></CalendarDay>)
        })}
        <CalendarButton onClick={() => decrementMonth()}> {`<`} </CalendarButton>
        <CalendarButton onClick={() => incrementMonth()}> {`>`} </CalendarButton>
      </CalendarContainer>
    </BlogsDiv>
  )
}

export default Blogs