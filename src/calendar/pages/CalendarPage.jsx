import { Navbar } from "../components/NavBar"
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { localizer,getMessage } from "../../helpers"
import { CalendarEvent, CalendarModal, FabAddNew, FabDelete } from "../"
import { useState } from "react"
import { useCalendarStore, useUiStore } from "../../hooks"

export const CalendarPage = () => {

  const {openDateModal} = useUiStore()
  const {events,setActiveEvent} = useCalendarStore()
  const [lastView] = useState(localStorage.getItem('lastView') || 'week')

  const eventStyleGetter = () =>{
    const style={
      backgroundColor:'#347CF7',
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
