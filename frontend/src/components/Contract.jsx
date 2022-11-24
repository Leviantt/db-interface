import React, { useState } from 'react';
import { formatDate } from '../utils/formatOutput';

function Contract({Id, RegistrationDate, ExecutionDate, CustomerName, CustomerAddress, update, remove}) {

  const [isEditable, setIsEditable] = useState(false);

  const formattedRegistrationDate = formatDate(RegistrationDate);
  const formattedExecutionDate = formatDate(ExecutionDate);

  function toggleIsEditable() {
    if(isEditable) {
      setRegistrationDate(formattedRegistrationDate);
      setExecutionDate(formattedExecutionDate);
      setCustomerName(CustomerName);
      setCustomerAddress(CustomerAddress);
    }
    setIsEditable(prevValue => !prevValue);
  }
  
  const [registrationDate, setRegistrationDate] = useState(formattedRegistrationDate)
  const [executionDate, setExecutionDate] = useState(formattedExecutionDate)
  const [customerName, setCustomerName] = useState(CustomerName)
  const [customerAddress, setCustomerAddress] = useState(CustomerAddress)


  function handleSave() {
    const contractData = {
      id: Id,
      registrationDate,
      executionDate,
      customerName,
      customerAddress
    }
    update(contractData)
    setIsEditable(prevValue => !prevValue);
  }

  return (
    <>
      {isEditable ? (
        <div className="tr">
          <div className='td' data-label="Id">{Id}</div>
            <input 
              className='td' 
              data-label="RegistrationDate" 
              value={registrationDate} 
              onChange={e => setRegistrationDate(e.target.value)}
            />
            <input 
              className='td' 
              data-label="ExecutionDate" 
              value={executionDate} 
              onChange={e => setExecutionDate(e.target.value)}
            />
            <input 
              className='td' 
              data-label="CustomerName" 
              value={customerName} 
              onChange={e => setCustomerName(e.target.value)}
            />
            <input 
              className='td' 
              data-label="CustomerAddress" 
              value={customerAddress} 
              onChange={e => setCustomerAddress(e.target.value)}
            />
            <div className='td'>
              <button className='btn btn-cancel' onClick={toggleIsEditable}>Cancel</button> 
              <button className='btn btn-save' onClick={handleSave}>Save</button>
            </div>
        </div>
        ) : (
          <div className='tr'>
            <div className='td' data-label="Id">{Id}</div>
            <div className='td' data-label="RegistrationDate">{registrationDate}</div>
            <div className='td' data-label="ExecutionDate">{executionDate}</div>
            <div className='td' data-label="CustomerName">{customerName}</div>
            <div className='td' data-label="CustomerAddress">{customerAddress}</div>
            <div className='td'>
              <button className='btn btn-edit' onClick={toggleIsEditable}>Edit</button> 
              <button className='btn btn-delete' onClick={() => remove(Id)}>Delete</button>
            </div>
          </div>
        )}
      </>
  )
}
export default Contract;
