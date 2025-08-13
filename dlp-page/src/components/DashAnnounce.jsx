import { Button, TextInput } from 'flowbite-react'
import React from 'react'
import { useEffect, useState } from 'react'
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const DashAnnounce = () => {

const [annData, setAnndata] = useState([])

useEffect(()=>{
    const fetchData =async()=>{
      try {
          const res = await fetch('/api/announce/')
     
        if(!res.ok){
         console.log('cannot fetch data')
         return
        }

        const data = await res.json()

       console.log(data)
       setAnndata(data)
      } catch (error) {
        console.log(error.message)
      }
    }

    fetchData()
},[annData])


const handleSubmit = async(e)=>{
e.preventDefault(e)

}



  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen '>
         <h1 className='text-center text-3xl my-7 font-semibold'>  Announcement Post </h1>
        <form className='flex flex-col gap-4'  onSubmit={handleSubmit}>
            
        <TextInput type='text' placeholder='title' required id='title' value={annData?.title || 'Write Title'}
        onChange={(e)=>{setAnndata({...annData, title:e.target.value})}}
        />

        <ReactQuill theme='snow' placeholder='Write Announcement' className='h-72  mb-5'  value={annData.content}
         onChange={(e)=>{setAnndata({...annData, content:e.target.value})}}/>
            <Button type='submit'>Submit</Button>
        </form>
    </div>
  )
}

export default DashAnnounce