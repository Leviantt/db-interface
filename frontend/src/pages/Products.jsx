import React, { useRef } from 'react'
import Contract from '../components/Contract'

import {
  useQuery,
  useMutation, 
  useQueryClient
} from '@tanstack/react-query';
import { addProduct, deleteProduct, getProducts, updateProduct } from '../api/products.js'
import Modal from 'react-modal';
import Product from '../components/Product'

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

function Products() {
  const queryClient = useQueryClient()

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
    
  const workshopIdRef = useRef('');
  const productNameRef = useRef('');
  const singleProductCostRef = useRef('');
  
  const { isLoading, data } = useQuery({ queryKey: ['products'], queryFn: getProducts })

  const addMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })

  function handleDelete(id) {
    deleteMutation.mutate({id});
  }

  function handleUpdate(id, productData) {
    updateMutation.mutate(id, productData)
  }



  function handleSubmit(e) {
    e.preventDefault();
    addMutation.mutate({
        workshopId: workshopIdRef.current.value,
        productName: productNameRef.current.value,
        singleProductCost: singleProductCostRef.current.value,
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
        <h3>Enter product data</h3>
        <form className='form'>
          <input ref={workshopIdRef} placeholder='Workshop id'/>
          <input ref={productNameRef} placeholder='Product name'/>
          <input ref={singleProductCostRef} placeholder='Single product cost'/>
          <button onClick={handleSubmit} className='btn btn-edit'>Add</button>
        </form>
      </Modal>
      <button className='btn btn-add' onClick={openModal}>Add</button>
      <div className="table">
        <thead>
          <div className='tr'>
            {/* //workshopId productName singleProductCost */}
            <div className='th'>Id</div>
            <div className='th'>WorkshopId</div>
            <div className='th'>ProductName</div>
            <div className='th'>SingleProductCost</div>
            <div className='th'></div>
          </div>
        </thead>
        <tbody>
          {data.map(product => <Product remove={handleDelete} update={handleUpdate} key={product.Id} {...product} />)}
        </tbody>
      </div>
    </div>
  )
}

export default Products;