import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  
  Modal.setAppElement('#root');

export const DeleteModal = ({deleteEvent,close,open}) => {

    const dltEvent =  () =>{
        deleteEvent()
        close()
    }
    
  return (
    <Modal
        isOpen={open}
        onRequestClose={close}
        style={customStyles}
        className='modal delete'
        overlayClassName='modal-fondo'
        closeTimeoutMS={200}
    >
        <h1 className='text-center'>¿Are you sure want to delete this event?</h1>
        <hr/>
        <div className='d-flex justify-content-center'>
            <button onClick={close} className='btn btn-primary m-2'>Close</button>
            <button onClick={dltEvent} className='btn btn-danger m-2'>Delete</button>
        </div>
    </Modal>
  )
}
