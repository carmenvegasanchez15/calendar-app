import { useState } from "react"
import { useCalendarStore } from "../../hooks"
import { DeleteModal } from "./DeleteModal"

export const FabDelete = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const {deleteEvent, hasEventSelected} = useCalendarStore()
  const handleDelete = () =>{
    // deleteEvent()
    setModalOpen(true)
  }

  const onCloseModal = () =>{
    setModalOpen(false)
}

  return (
    <>
      <DeleteModal deleteEvent={deleteEvent} close={onCloseModal} open={modalOpen}/>
      <button className="btn btn-danger fab-danger" onClick={handleDelete} style={{display: hasEventSelected ? '' : 'none'}}><i className="fas fa-trash-alt"></i></button>
    </>
    
  )
}
