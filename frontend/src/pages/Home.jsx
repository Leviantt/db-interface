import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getStatistics } from '../api/home';
import StatItem from '../components/StatItem';
import { calculateTotalPrice, calculateTotalProductsCount } from '../utils/calculateTotal';

function Home() {

  const { isLoading, data } = useQuery({ queryKey: ['statistics'], queryFn: getStatistics })


  if(isLoading) return "Loading...";

  console.log(data);
  const statItems = [];
  for(let key in data) {
    statItems.push(<StatItem key={key} workshop={data[key]}/>)
  }


  return (
    <div className='table-container'>
      <div className="table">
        <thead>
          <tr className='tr'>
            <th className='th'>Workshop name</th>
            <th className='th'>Product name</th>
            <th className='th'>Contract id</th>
            <th className='th'>Products count</th>
            <th className='th'>Single product cost</th>
            <th className='th'>Total price</th>
          </tr>
        </thead>
        <tbody>
          {statItems}
          <tr className='tr'>
            <td className='td' style={{fontWeight: 600, textTransform: 'uppercase'}}>Total</td>
            <td className='td' style={{border: 'none'}}></td>
            <td className='td' style={{border: 'none'}}></td>
            <td className='td'>{calculateTotalProductsCount(data)}</td>
            <td className='td' style={{border: 'none'}}></td>
            <td className='td'>{calculateTotalPrice(data)}</td>
        </tr>
        </tbody>
      </div>
    </div>
  )
}

export default Home