import React from 'react'



const Cardfeature = ({ image, name, price, category,loading, }) => {
  return (
    <div className='w-fulll min-w-[200px] max-w-[200px] bg-white hover:shadow-lg drop-shadow-lg py-5 px-4 cursor-pointer flex flex-col'>
      {
        image ? (
           <>
    
         <div className='h-28 flex  justify-center item-center'>
         <img src={image} className="h-full " />
      </div>
      <h3 className='font-semibold text-slate-600  capitalize text-lg mt-4'>{name}</h3>
      <p className=' text-slate-500 font-medium'>{category}</p>
      <p className=' font-bold'><span className='text-red-500 py-1 '>₹</span><span>{price}</span></p>
      <button className='bg-blue-500 py-1 mt-2 rounded hover:bg-blue-600 w-full'>Add Cart</button>
      
        </>
      ) : (
        <div className='min-h-[150px] flex justify-center items-center'>
          <p>{loading}</p>
          </div>
      )}
      
    </div>
   
  )
}

export default Cardfeature
