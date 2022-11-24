import React, { useState } from 'react';

function Workshop({Id, Director, PhoneNumber, WorkshopName, update, remove}) {
  const [isEditable, setIsEditable] = useState(false);


  function toggleIsEditable() {
    if(isEditable) {
        setDirector(Director);
        setPhoneNumber(PhoneNumber);
        setWorkshopName(WorkshopName);

    }
    setIsEditable(prevValue => !prevValue);
  }
  
  const [director, setDirector] = useState(Director)
  const [phoneNumber, setPhoneNumber] = useState(PhoneNumber)
  const [workshopName, setWorkshopName] = useState(WorkshopName)


  function handleSave() {
    const workshopData = {
      id: Id,
      director,
      phoneNumber,
      workshopName
    }
    update(workshopData)
    setIsEditable(prevValue => !prevValue);
  }

  return (
    <>
      {isEditable ? (
        <div className="tr">
          <div className='td' data-label="Id">{Id}</div>
            <input 
              className='td' 
              data-label="Director" 
              value={director} 
              onChange={e => setDirector(e.target.value)}
            />
            <input 
              className='td' 
              data-label="PhoneNumber" 
              value={phoneNumber} 
              onChange={e => setPhoneNumber(e.target.value)}
            />
            <input 
              className='td' 
              data-label="WorkshopName" 
              value={workshopName} 
              onChange={e => setWorkshopName(e.target.value)}
            />
            <div className='td'>
              <button className='btn btn-cancel' onClick={toggleIsEditable}>Cancel</button> 
              <button className='btn btn-save' onClick={handleSave}>Save</button>
            </div>
        </div>
        ) : (            
          <div className='tr'>
            <div className='td' data-label="Id">{Id}</div>
            <div className='td' data-label="director">{director}</div>
            <div className='td' data-label="phoneNumber">{phoneNumber}</div>
            <div className='td' data-label="workshopName">{workshopName}</div>
            <div className='td'>
              <button className='btn btn-edit' onClick={toggleIsEditable}>Edit</button> 
              <button className='btn btn-delete' onClick={() => remove(Id)}>Delete</button>
            </div>
          </div>
        )}
      </>
  )
}
export default Workshop;
