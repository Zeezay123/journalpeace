import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useState } from 'react';
import LexicalEditor from '../components/LexiEditor';



const editorConfig = {
  theme: {},
  onError(error) {
    throw error;
  },
};



const CreatePost = () => {
const [markdown, setMarkdown] = useState('Enter you post')

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen '>
        <h1 className='text-center text-3xl my-7 font-semibold'>  CreatePost </h1>
       <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <TextInput type='text' placeholder='Title' required id='title'
            className='flex-1'/>
            <Select className='min-w-40'>
                <option value='uncategories'> Select a category </option>
                <option value='news'> Fees </option>
                <option value='news'> Course </option>
                <option value='news'> Exams </option>

            </Select>

        </div>
        <div className='flex gap-4 items-center justify-between border-4 
        border-blue-900 border-dotted p-3'>
            <FileInput type='file' accept='images/*'/>
            <Button type='button' size='sm' outline className=''> Upload image </Button>
        </div>


<LexicalEditor/>

 <Button type='submit'> Submit Post</Button>




       </form>
        
        </div>
  )
}

export default CreatePost