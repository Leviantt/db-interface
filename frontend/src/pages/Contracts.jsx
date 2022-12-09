import React, { useRef } from 'react'
import Contract from '../components/Contract'

import {
  useQuery,
  useMutation, 
  useQueryClient
} from '@tanstack/react-query';
import { addContract, deleteContract, getContracts, updateContract } from '../api/contracts.js';
import Modal from 'react-modal';

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

function Contracts() {
  const queryClient = useQueryClient()

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  // RegistrationDate, ExecutionDate, CustomerName, CustomerAddress
  const registrationDateRef = useRef('');
  const executionDateRef = useRef('');
  const customerNameRef = useRef('');
  const customerAddressRef = useRef('');
  
  const { isLoading, data } = useQuery({ queryKey: ['contracts'], queryFn: getContracts })

  const addMutation = useMutation({
    mutationFn: addContract,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['contracts'] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateContract,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['contracts'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteContract,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['contracts'] })
    },
  })

  function handleDelete(id) {
    deleteMutation.mutate({id});
  }

  function handleUpdate(id, contractData) {
    updateMutation.mutate(id, contractData)
  }



  function handleSubmit(e) {
    e.preventDefault();

    addMutation.mutate({
      // RegistrationDate, ExecutionDate, CustomerName, CustomerAddress
      registrationDate: registrationDateRef.current.value,
      executionDate: executionDateRef.current.value,
      customerName: customerNameRef.current.value,
      customerAddress: customerAddressRef.current.value
    })
    closeModal();
  }

  if(isLoading) return <div className="loader">Loading...</div>;

  return (
    <div className='table-container'>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal} className='btn btn-close' >close</button>
        <h3>Enter contract data</h3>
        <form className='form'>
        {/* Id, RegistrationDate, ExecutionDate, CustomerName, CustomerAddress */}
          <input ref={registrationDateRef} placeholder='Registration date'/>
          <input ref={executionDateRef} placeholder='Execution date'/>
          <input ref={customerNameRef} placeholder='Customer name'/>
          <input ref={customerAddressRef} placeholder='Customer address'/>
          <button onClick={handleSubmit} className='btn btn-edit'>Add</button>
        </form>
      </Modal>
      <button className='btn btn-add' onClick={openModal}>Add</button>
      <div className="table">
        <thead>
          <div className='tr'>
            <div className='th'>Id</div>
            <div className='th'>RegistrationDate</div>
            <div className='th'>ExecutionDate</div>
            <div className='th'>CustomerName</div>
            <div className='th'>CustomerAddress</div>
            <div className='th'></div>
          </div>
        </thead>
        <tbody>
          {data.map(contract => <Contract remove={handleDelete} update={handleUpdate} key={contract.Id} {...contract} />)}
        </tbody>
      </div>
    </div>
  )
}

export default Contracts