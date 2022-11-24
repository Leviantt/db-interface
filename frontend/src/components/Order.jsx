import React, { useState } from 'react';

function Order({Id, ContractId, ProductId, ProductsCount, update, remove}) {
    // contractId productId productsCount 

  const [isEditable, setIsEditable] = useState(false);


  function toggleIsEditable() {
    if(isEditable) {
        setContractId(ContractId);
        setProductId(ProductId);
        setProductsCount(ProductsCount);
    }
    setIsEditable(prevValue => !prevValue);
  }
  
  const [contractId, setContractId] = useState(ContractId)
  const [productId, setProductId] = useState(ProductId)
  const [productsCount, setProductsCount] = useState(ProductsCount)


  function handleSave() {
    const orderData = {
      id: Id,
      contractId,
      productId,
      productsCount
    }
    update(orderData)
    setIsEditable(prevValue => !prevValue);
  }

  return (
    <>
      {isEditable ? (
        <div className="tr">
          <div className='td' data-label="Id">{Id}</div>
            <input 
            // ContractId, ProductId, ProductsCount,
            // contractId,
            // productId,
            // productsCount
              className='td' 
              data-label="ContractId" 
              value={contractId} 
              onChange={e => setContractId(e.target.value)}
            />
            <input 
              className='td' 
              data-label="ProductId" 
              value={productId} 
              onChange={e => setProductId(e.target.value)}
            />
            <input 
              className='td' 
              data-label="ProductsCount" 
              value={productsCount} 
              onChange={e => setProductsCount(e.target.value)}
            />
            <div className='td'>
              <button className='btn btn-cancel' onClick={toggleIsEditable}>Cancel</button> 
              <button className='btn btn-save' onClick={handleSave}>Save</button>
            </div>
        </div>
        ) : (            
          <div className='tr'>
            <div className='td' data-label="Id">{Id}</div>
            <div className='td' data-label="contractId">{contractId}</div>
            <div className='td' data-label="productId">{productId}</div>
            <div className='td' data-label="productsCount">{productsCount}</div>
            <div className='td'>
              <button className='btn btn-edit' onClick={toggleIsEditable}>Edit</button> 
              <button className='btn btn-delete' onClick={() => remove(Id)}>Delete</button>
            </div>
          </div>
        )}
      </>
  )
}
export default Order;
