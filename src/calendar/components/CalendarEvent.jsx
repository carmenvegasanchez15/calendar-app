import propTypes from 'prop-types'
import { useCalendarStore } from '../../hooks'

export const CalendarEvent = ({event}) => {
  const {hasEventSelected} = useCalendarStore()
    const {title,user}=event
  return (
    <div style={{backgroundColor:hasEventSelected ? '#054afa':''}}>
        <strong >{title}</strong>
        <span> - {user.name}</span>
    </div>
  )
}

CalendarEvent.propTypes = {
    event:propTypes.object,
    title: propTypes.string,
    name: propTypes.string
}