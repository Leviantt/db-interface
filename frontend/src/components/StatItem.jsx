import React from 'react'

function StatItem({ workshop }) {
    console.log(workshop);
    const {WorkshopName, ProductName, ContractId, ProductsCount, SingleProductCost, TotalPrice} = workshop[0];
    {/* {"WorkshopName":"Марка Принт","ProductName":"Журнал \"Vogue\"","ContractId":1,"ProductsCount":1000,"SingleProductCost":501,"TotalPrice":501000} */}
  return (
    <>
        <tr className='tr'>
            <td className='td'>{WorkshopName}</td>
            <td className='td'>{ProductName}</td>
            <td className='td'>{ContractId}</td>
            <td className='td'>{ProductsCount}</td>
            <td className='td'>{SingleProductCost}</td>
            <td className='td'>{TotalPrice}</td>
        </tr>
        {workshop.filter((_, i) => i !== 0).map(({ProductName, ContractId, ProductsCount, SingleProductCost, TotalPrice}) => (
            <tr className='tr'>
                <td className='td' style={{border: 'none'}}></td>
                <td className='td'>{ProductName}</td>
                <td className='td'>{ContractId}</td>
                <td className='td'>{ProductsCount}</td>
                <td className='td'>{SingleProductCost}</td>
                <td className='td'>{TotalPrice}</td>
            </tr>
        ))}
        <tr className='tr' style={{marginBottom: '.25em'}}>
            <td className='td' style={{fontWeight: 600}} >Workshop Total</td>
            <td className='td' style={{border: 'none'}}></td>
            <td className='td' style={{border: 'none'}}></td>
            <td className='td' style={{fontWeight: 600}}>{workshop.reduce((sum, item) =>  item.ProductsCount + sum, 0)}</td>
            <td className='td' style={{border: 'none'}}></td>
            <td className='td' style={{fontWeight: 600}}>{workshop.reduce((sum, item) => item.TotalPrice + sum, 0)}</td>
        </tr>
    </>
  )
}

export default StatItem;

{/* <div className='tr'>
    <div className='td' data-label="workshopName">{workshopName}</div>
    <div className='td' data-label="productName">{productName}</div>
    <div className='td' data-label="contractId">{contractId}</div>
    <div className='td' data-label="productsCount">{productsCount}</div>
    <div className='td' data-label="singleProductCost">{singleProductCost}</div>
    <div className='td' data-label="totalPrice">{totalPrice}</div>
</div> */}