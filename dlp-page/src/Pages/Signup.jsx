import React from 'react'
import { Button, Label, TextInput } from 'flowbite-react'
import logo from '../assets/delsulogo.png'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <section className='flex flex-col items-center  justify-center gap-10 p-5 min-h-screen lg:px-10'>
      <div className='flex flex-col items-center justify-center'>
        <div className='mb-5 w-[8rem] h-[8rem] md:w-[12rem] md:h-[12rem]  '>  <img className='h-full w-full object-contain' src={logo} alt="delsu logo" /></div> 
        <h1 className='font-bold font-sans text-3xl mt-5 mb-5 self-center text-center w-[300px] md:w-full  md:text-4xl'>Welcome to Delsu Distance Learning CMS </h1>
      </div>


      <div className=' w-[25rem] flex flex-col items center'>
        <form className='flex flex-col gap-5'>
          <div>
            <Label value='Your Username' />
            <TextInput type='text' placeholder='Username' id='username' />
          </div>
          <div>
            <Label value='Your email' />
            <TextInput type='text' placeholder='name@delsu.ng.edu' id='email' />
          </div>
          <div>
            <Label value='Your password' />
            <TextInput type='password' placeholder='********' id='password' />
          </div>

          <Button type='submit'>Sign Up </Button>
        </form>

        <div className='flex gap-2 text-sm mt-2 items-center justify-center'>

          <span className='font-medium'> Have an account?</span>
          <Link to='signin' className='text-blue-800' > Sign in</Link>

        </div>
      </div>
      
      </section>
  )
}

export default Signup