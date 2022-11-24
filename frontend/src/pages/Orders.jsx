import React, { useRef } from 'react'
import Contract from '../components/Contract'

import {
  useQuery,
  useMutation, 
  useQueryClient
} from '@tanstack/react-query';
import { addOrder, deleteOrder, getOrders, updateOrder } from '../api/orders.js'
import Modal from 'react-modal';
import Order from '../components/Order'

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

function Orders() {
  const queryClient = useQueryClient()

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
    // contractId,
    // productId,
    // productsCount
  const contractIdRef = useRef('');
  const productIdRef = useRef('');
  const productsCountRef = useRef('');
  
  const { isLoading, data } = useQuery({ queryKey: ['orders'], queryFn: getOrders })

  const addMutation = useMutation({
    mutationFn: addOrder,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })

  function handleDelete(id) {
    deleteMutation.mutate({id});
  }

  function handleUpdate(id, orderData) {
    updateMutation.mutate(id, orderData)
  }



  function handleSubmit(e) {
    e.preventDefault();

    addMutation.mutate({
      contractId: contractIdRef.current.value,
      productId: productIdRef.current.value,
      productsCount: productsCountRef.current.value,
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
        <h3>Enter order data</h3>
        <form className='form'>
          <input ref={contractIdRef} placeholder='Contract id'/>
          <input ref={productIdRef} placeholder='Product id'/>
          <input ref={productsCountRef} placeholder='Products count'/>
          <button onClick={handleSubmit} className='btn btn-edit'>Add</button>
        </form>
      </Modal>
      <button className='btn btn-add' onClick={openModal}>Add</button>
      <div className="table">
        <thead>
          <div className='tr'>
            <div className='th'>Id</div>
            <div className='th'>ContractId</div>
            <div className='th'>ProductId</div>
            <div className='th'>ProductsCount</div>
            <div className='th'></div>
          </div>
        </thead>
        <tbody>
          {data.map(order => <Order remove={handleDelete} update={handleUpdate} key={order.Id} {...order} />)}
        </tbody>
      </div>
    </div>
  )
}

export default Orders;