import { useDispatch, useSelector } from 'react-redux'
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from '../store'
import calendarApi from '../api/calendarApi'
import { convertEventsToDate } from '../helpers'
import Swal from 'sweetalert2'

export const useCalendarStore = () => {
  const dispatch = useDispatch()
  const { events, activeEvent } = useSelector((state) => state.calendar)
  const { user } = useSelector((state) => state.auth)

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
        dispatch(onUpdateEvent({ ...calendarEvent, user }))
        return
      }
      const { data } = await calendarApi.post('/events', calendarEvent)
      dispatch(
        onAddNewEvent({ ...calendarEvent, id: data.events.id, user: user })
      )
    } catch (error) {
      Swal.fire('Error al guardar', error.response.data.msg, 'fire')
      console.log(error)
    }
  }

  const startDeleteEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`)
      dispatch(onDeleteEvent())
    } catch (error) {
      Swal.fire('Error al eliminar', error.response.data.msg, 'fire')
      console.log(error)
    }
  }

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events')
      const event = convertEventsToDate(data.events)
      dispatch(onLoadEvent(event))
    } catch (error) {
      console.log(error)
    }
  }

  return {
    //Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    //Metodo
    setActiveEvent,
    startSavingEvent,
    deleteEvent: startDeleteEvent,
    startLoadingEvents,
  }
}
