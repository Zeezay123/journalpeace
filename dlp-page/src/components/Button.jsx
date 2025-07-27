import React from 'react'



const Button = ({icon,text}) => {
  return (
    <div className='flex gap-2 pl-2 py-2 pr-2 rounded items-center justify-end bg-blue-600'> 
    <span className='font-sans text-sm font-normal text-white'>{text}</span> <span className='flex justify-center items-center bg-white p-2 rounded'>{icon && icon} </span> </div>
  )
}

export default Button