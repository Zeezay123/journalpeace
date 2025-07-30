import { TextInput, Button } from 'flowbite-react'
import React from 'react'
import { useSelector } from 'react-redux'

const DashProfile = () => {
const {currentUser} = useSelector(state => state.user)

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
       <h1 className=' py-2 text-center font-semibold text-3xl'> Profile </h1>
    <form className='flex flex-col gap-4 '> 
      <div className='w-32 h-32 self-center cursor-pointer 
       shadow-md overflow-hidden rounded-full'>
        
      <img src={currentUser.profilePhoto } alt='user'  className='rounded-full 
      w-full h-full object-cover border-8 border-[lightgray]'/>
        </div>  

        <TextInput type='text'  id='username' placeholder='username' defaultValue={currentUser.username}/>
        <TextInput type='email'  id='email' placeholder='email@mail' defaultValue={currentUser.email}/>
        <TextInput type='password'  id='username' placeholder='username' defaultValue='********'/>
      
      <Button type='submit' outline> 
        Update
      </Button>
    </form>

    <div className='flex text-red-500 justify-between mt-5 '> 
      <span className='cursor-pointer'> Delete Account </span> 
      <span className='cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}

export default DashProfile 