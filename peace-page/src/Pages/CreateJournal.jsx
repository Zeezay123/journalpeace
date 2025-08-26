import { Alert, Button, FileInput, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { useState } from 'react'
import ReactQuill, { Quill } from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {CircularProgressbar} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import API from '../../api';



const CreateJournal = () => {   
const [formData, setFormData] = useState({})
const [uploadProgress, setUploadProgress] = useState('')
const [publisherr, setPublishErr] = useState(null) 
const [pdfFile, setPdfFile] = useState(null)
const [pdfErrMessage, setPdfErrMessage] = useState(null) 
const navigate = useNavigate()



const handleChange = (e)=>{
    const file = e.target.files[0]
    setPdfFile(file)
}


const data = new FormData()
data.append('file', pdfFile)
data.append('upload_preset', 'codelWebImagesPreset')

const handleUpload = async() =>{
    const cloudname = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  
    try{
        if(!pdfFile){
            setPdfErrMessage('Upload a and pdf')
        }

    const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudname}/image/upload`, data,
        {
            onUploadProgress: (ProgressEvent)=>{
                const  percent = Math.round((ProgressEvent.loaded * 100)/ ProgressEvent.total)
                setUploadProgress(percent)
            }
        }
    )
const url = res.data.secure_url

setFormData({...formData, file:url})
setPdfErrMessage(null)
setUploadProgress(null)

    }catch(error){
        setPdfErrMessage('trouble uploading journal')
    }

}

const handleSubmit = async(e) =>{
   e.preventDefault()
   try{
    const res = await fetch(`${API}/api/journal/create`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    
    const data = await res.json()
   
if(!res.ok){
    setPublishErr(data.message)
    console.log('respose not ok')

}

if(res.ok){
    setPublishErr(null)
}

}catch(error) {
    setPublishErr('Unable to post journal')
}
}




  return (
    <div className='max-w-6xl mx-auto p-5'>
     
<form onSubmit={handleSubmit} >
 
 <Label> Journal Title </Label>
 
 <TextInput 
  type='text'
  placeholder='write journal name'
  id='filename'
  onChange={(e)=>setFormData((formData)=> ({...formData, filename:e.target.value  }))}
 />
<div>
<Label> Description </Label>
<ReactQuill theme='snow' placeholder='write about the journal' 
className='h-72 mb-10' onChange={(value)=> {setFormData({...formData, details:value})}}  />
 </div>

 <Label> Add journal </Label>
 <FileInput type='file' accept='application/pdf*' onChange={handleChange} />
 <Button
              type='button'
              size='sm'
              outline
              onClick={handleUpload}
              disabled={uploadProgress  }
              >
               { uploadProgress ? <div className='w-16 h-16'> 
 
                 <CircularProgressbar value={uploadProgress} text={`${uploadProgress || 0 }%`}/>
 
               </div>:
               'Upload image'
             }
               </Button>

<Button type='submit'> Submit </Button>
{ 
    publisherr  && <Alert color='failure' className='mt-6'> {publisherr}</Alert>
}

</form>

    </div>
  )
}

export default CreateJournal