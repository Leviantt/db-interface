import React, { useRef } from 'react'
import Contract from '../components/Contract'

import {
  useQuery,
  useMutation, 
  useQueryClient
} from '@tanstack/react-query';
import { addWorkshop, deleteWorkshop, getWorkshops, updateWorkshop } from '../api/workshops.js'
import Modal from 'react-modal';
import Workshop from '../components/Workshop';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column'
  },
};

Modal.setAppElement('#root');

function Workshops() {
  const queryClient = useQueryClient()

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const directorRef = useRef('');
  const phoneNumberRef = useRef('');
  const workshopNameRef = useRef('');
  
  const { isLoading, data } = useQuery({ queryKey: ['workshops'], queryFn: getWorkshops })

  const addMutation = useMutation({
    mutationFn: addWorkshop,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['workshops'] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateWorkshop,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['workshops'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteWorkshop,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['workshops'] })
    },
  })

  function handleDelete(id) {
    deleteMutation.mutate({id});
  }

  function handleUpdate(id, workshopData) {
    updateMutation.mutate(id, workshopData)
  }



  function handleSubmit(e) {
    e.preventDefault();

    addMutation.mutate({
        director: directorRef.current.value,
        phoneNumber: phoneNumberRef.current.value,
        workshopName: workshopNameRef.current.value,
    })
    closeModal();
  }

  if(isLoading) return <div className="loader">Loading...</div>;

  return (
    <div className='products-container'>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal} className='btn btn-close' >close</button>
        <h3>Enter workshop data</h3>
        <form className='form'>
          <input ref={directorRef} placeholder='Director'/>
          <input ref={phoneNumberRef} placeholder='Phone number'/>
          <input ref={workshopNameRef} placeholder='Workshop name'/>
          <button onClick={handleSubmit} className='btn btn-edit'>Add</button>
        </form>
      </Modal>
      <button className='btn btn-add' onClick={openModal}>Add</button>
      <div className="table">
        <thead>
          <div className='tr'>
            <div className='th'>Id</div>
            <div className='th'>Director</div>
            <div className='th'>PhoneNumber</div>
            <div className='th'>WorkshopName</div>
            <div className='th'></div>
          </div>
        </thead>
        <tbody>
          {data.map(workshop => <Workshop remove={handleDelete} update={handleUpdate} key={workshop.Id} {...workshop} />)}
        </tbody>
      </div>
    </div>
  )
}

export default Workshops;