import { Button, FileInput, Label, TextInput } from 'flowbite-react'
import React, { useState, useEffect } from 'react'
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const DashOthers = () => {
  const [formData, setFormData] = useState({
    key: 'homePage', // default key
    title: '',
    subtitle: '',
    content: '',
    file: null
  })

  const [selection, setSelection] = useState('homePage')

  useEffect(() => {
    // fetch existing data for the selected key
    const fetchData = async () => {
      try {
        const res = await fetch('/api/focus/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ key: selection })
        })

        if (!res.ok) {
          console.log('No response')
          return
        }

        const data = await res.json()
        console.log(data)
        // Optionally prefill formData here
      } catch (error) {
        console.log(error.message)
      }
    }

    fetchData()
  }, [selection])

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

//   const handleFileChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       file: e.target.files[0]
//     }))
//   }

  const handleSelectionClick = (key) => {
    setSelection(key)
    setFormData(prev => ({
      ...prev,
      key // update key in formData
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
    //   const form = new FormData()
    //   for (let key in formData) {
    //     form.append(key, formData[key])
    //   }

      const res = await fetch('/api/focus/', {
        method: 'POST',
         headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({key:selection,...formData})
      })
    console.log(formData)
      if (!res.ok) {
        console.log('Error submitting form')
        return
      }

      const data = await res.json()
      console.log('Submitted successfully:', data)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className='flex max-w-6xl h-screen  p-5 flex-col mx-auto'>

        
      {/* Selection buttons */}
     <div className='flex flex-wrap justify-center items-center gap-10'>
  <div  
    className={`px-4 py-2 cursor-pointer rounded-sm ${selection === 'homePage' ? 'bg-blue-800 text-white' : 'bg-slate-200 text-black'}`}  
    onClick={() => handleSelectionClick('homePage')}
  >
    Home Page
  </div> 

  <div  
    className={`px-4 py-2 cursor-pointer rounded-sm ${selection === 'submitPage' ? 'bg-blue-800 text-white' : 'bg-slate-200 text-black'}`}  
    onClick={() => handleSelectionClick('submitPage')}
  >
    Submit Page
  </div>

  <div  
    className={`px-4 py-2 cursor-pointer rounded-sm ${selection === 'aboutPage' ? 'bg-blue-800 text-white' : 'bg-slate-200 text-black'}`}  
    onClick={() => handleSelectionClick('aboutPage')}
  >
    About Page
  </div>

  <div  
    className={`px-4 py-2 cursor-pointer rounded-sm ${selection === 'focusPage' ? 'bg-blue-800 text-white' : 'bg-slate-200 text-black'}`}  
    onClick={() => handleSelectionClick('focusPage')}
  >
    Focus Page
  </div>
</div>


      {/* Form */}
      <form className='flex flex-col gap-5 mt-10' onSubmit={handleSubmit}>
        <Label htmlFor='title'>Title</Label>
        <TextInput id='title' value={formData.title} onChange={handleChange} />

        <Label htmlFor='subtitle'>Sub Title</Label>
        <TextInput id='subtitle' value={formData.subtitle} onChange={handleChange} />

        <Label htmlFor='content'>Content</Label>
        <ReactQuill theme="snow" placeholder='Write something' className='h-72 mb-5' onChange={(value)=>{
         setFormData({...formData, content:value})
       }} />

        

        {/* <Label htmlFor='file'>File</Label>
        <FileInput id='file' onChange={handleFileChange} /> */}

        <Button type='submit'>Submit</Button>
      </form>
    </div>
  )
}

export default DashOthers
