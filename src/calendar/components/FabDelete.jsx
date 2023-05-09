import { useCalendarStore } from "../../hooks"

export const FabDelete = () => {
  const {deleteEvent, hasEventSelected} = useCalendarStore()
  const handleDelete = () =>{
    deleteEvent()
  }

  return (
    <button className="btn btn-danger fab-danger" onClick={handleDelete} style={{display: hasEventSelected ? '' : 'none'}}><i className="fas fa-trash-alt"></i></button>
  )
}
