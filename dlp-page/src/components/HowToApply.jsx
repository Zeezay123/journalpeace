import { Card } from 'flowbite-react'
import React from 'react'
import { FaRegFileAlt } from 'react-icons/fa'
import { TbMessage2Share } from 'react-icons/tb'


const HowToApply = () => {


  return (
    <div className=' flex flex-col md:p-20 p-5 items-center md:items-start gap-10'>
        
   <div className='flex md:flex-row md:justify-between flex-col  items-center w-full'> <h1 className=' font-bold font-sans text-3xl text-blue-800'> How to Apply</h1>
    <h2 className=' underline font-semibold text-lg font-sans '>View all Requirements</h2> </div>
        

        <div className='flex flex-col md:flex-row gap-5 '>
         

            <Card>
                <h1 className='text-2xl font-bold tracking-tight text-gray-900 flex gap-3 items-center dark:text-white'><span> <FaRegFileAlt/> </span> How to apply</h1>
                 <p className="font-normal text-gray-700 dark:text-gray-400">It is a long established fact that a reader will be distracted by the readable
                 content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it
                   has a more-or-less normal distribution of letters,</p>
            </Card>

               <Card>
                <h1 className='text-2xl font-bold tracking-tight text-gray-900 flex gap-3 items-center dark:text-white'><span> <TbMessage2Share /> </span> How to apply</h1>
                 <p className="font-normal text-gray-700 dark:text-gray-400">It is a long established fact that a reader will be distracted by the readable
                 content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it
                   has a more-or-less normal distribution of letters,</p>
            </Card>

                <Card>
                <h1 className='text-2xl font-bold tracking-tight text-gray-900 flex gap-3 items-center dark:text-white'><span> <FaRegFileAlt/> </span> How to apply</h1>
                 <p className="font-normal text-gray-700 dark:text-gray-400">It is a long established fact that a reader will be distracted by the readable
                 content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it
                   has a more-or-less normal distribution of letters,</p>
            </Card> 
        </div>
        
        </div>
  )
}

export default HowToApply