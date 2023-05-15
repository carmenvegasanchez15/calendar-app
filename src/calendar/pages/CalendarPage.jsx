import { Navbar } from "../components/NavBar"
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { localizer,getMessage } from "../../helpers"
import { CalendarEvent, CalendarModal, FabAddNew, FabDelete } from "../"
import { useEffect, useState } from "react"
import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks"

export const CalendarPage = () => {
  const {user} = useAuthStore()
  const {openDateModal} = useUiStore()
  const {events,setActiveEvent,startLoadingEvents} = useCalendarStore()
  const [lastView] = useState(localStorage.getItem('lastView') || 'week')

  const eventStyleGetter = (event,start,end,isSelected) =>{
    const isMyEvent = (user.uid===event.user._id) ||  (user.uid===event.user.uid)
    const style={
      backgroundColor: isMyEvent ? '#347CF7' : '#464660',
      borderRadius:'0px'
    }
    return {style}
  }

  const onDoubleClick=()=>{
    openDateModal()
  }

  const onSelect=(event)=>{
    setActiveEvent(event)
  }

  const onViewChanged=(event)=>{
    localStorage.setItem('lastView',event)
  }
  
  useEffect(() => {
    startLoadingEvents()
  }, [])
  

  return (
    <>
      <Navbar/>
      <Calendar
        culture="es"
        messages={getMessage()}
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal/>
      <FabAddNew/>
      <FabDelete/>
    </>
  )
}
