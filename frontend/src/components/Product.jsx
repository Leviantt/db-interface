import React, { useState } from 'react';

function Product({Id, WorkshopId, ProductName, SingleProductCost, update, remove}) {
    // workshopId productName singleProductCost

  const [isEditable, setIsEditable] = useState(false);


  function toggleIsEditable() {
    if(isEditable) {
        setWorkshopId(WorkshopId);
        setProductName(ProductName);
        setSingleProductCost(SingleProductCost);
    }
    setIsEditable(prevValue => !prevValue);
  }
  
  const [workshopId, setWorkshopId] = useState(WorkshopId)
  const [productName, setProductName] = useState(ProductName)
  const [singleProductCost, setSingleProductCost] = useState(SingleProductCost)
 // workshopId productName singleProductCost

  function handleSave() {
    const productData = {
      id: Id,
      workshopId,
      productName,
      singleProductCost
    }
    update(productData)
    setIsEditable(prevValue => !prevValue);
  }

  return (
    <>
      {isEditable ? (
        <div className="tr">
          <div className='td' data-label="Id">{Id}</div>
            <input 
              className='td' 
              data-label="WorkshopId" 
              value={workshopId} 
              onChange={e => setWorkshopId(e.target.value)}
            />
            <input 
              className='td' 
              data-label="ProductName" 
              value={productName} 
              onChange={e => setProductName(e.target.value)}
            />
            <input 
              className='td' 
              data-label="SingleProductCost" 
              value={singleProductCost} 
              onChange={e => setSingleProductCost(e.target.value)}
            />
            <div className='td'>
              <button className='btn btn-cancel' onClick={toggleIsEditable}>Cancel</button> 
              <button className='btn btn-save' onClick={handleSave}>Save</button>
            </div>
        </div>
        ) : (            
          <div className='tr'>
            <div className='td' data-label="Id">{Id}</div>
            <div className='td' data-label="workshopId">{workshopId}</div>
            <div className='td' data-label="productName">{productName}</div>
            <div className='td' data-label="singleProductCost">{singleProductCost}</div>
            <div className='td'>
              <button className='btn btn-edit' onClick={toggleIsEditable}>Edit</button> 
              <button className='btn btn-delete' onClick={() => remove(Id)}>Delete</button>
            </div>
          </div>
        )}
      </>
  )
}
export default Product;
