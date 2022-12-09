import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getStatistics } from '../api/home';
import StatItem from '../components/StatItem';
import { calculateTotalPrice, calculateTotalProductsCount } from '../utils/calculateTotal';
import { useState } from 'react';
import { useMemo } from 'react';
import { getLastNYears } from '../utils/getLastNYears';

const NUMBER_OF_STATISTICS_YEARS = 3;

function Home() {
  const years = useMemo(() => getLastNYears(NUMBER_OF_STATISTICS_YEARS), []);

  const [currentYear, setCurrentYear] = useState(years[years.length - 1]);
  const { isLoading, data } = useQuery({ queryKey: ['statistics', currentYear], queryFn: () => getStatistics(currentYear) })

  if(isLoading) return "Loading...";

  const statItems = [];
  for(let key in data) {
    statItems.push(<StatItem key={key} workshop={data[key]}/>)
  }

  function handleSelectChange(e) {
    setCurrentYear(e.target.value);
  }

  return (
    <div className='table-container'>
      <div className="select-year-group">
        <label htmlFor="years">Statistics year</label>
        <select value={currentYear} onChange={handleSelectChange} className='years' name="years" id="years">
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
                ))}
        </select>
      </div>
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
            <td className='td' style={{fontWeight: 600}}>{calculateTotalProductsCount(data)}</td>
            <td className='td' style={{border: 'none'}}></td>
            <td className='td' style={{fontWeight: 600}}>{calculateTotalPrice(data)}</td>
        </tr>
        </tbody>
      </div>
    </div>
  )
}

export default Home