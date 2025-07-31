import { TextInput, Button } from 'flowbite-react'
import React from 'react'
import { useSelector } from 'react-redux'
import { useRef, useState,useEffect } from 'react'

const DashProfile = () => {
const {currentUser} = useSelector(state => state.user)
const [imageFile, setImageFile]= useState('')
const [previewImageUrl, setPreviewImageUrl] =useState('')
const newPic = useRef()


const onChoose =()=> {
  newPic.current.click()
}
const handleChange=(e)=>{
 const file = e.target.files[0]
if(file){
  setImageFile(file)
 const preview = URL.createObjectURL(file)
 setPreviewImageUrl(preview)
}
}


useEffect(()=>{

  if(imageFile){
    uploadImage()
  }
},[imageFile])

const data = new FormData()
data.append('file', imageFile)
data.append('upload_preset', 'codelWebImagesPreset')

const uploadImage = async()=>{
const cloudname = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  try{
const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudname}/image/upload`, {
  method:'POST',
  body:data
})

const {url} = await res.json()
 console.log(url)
return url
  }catch(error){
    console.log('Error Message:', error)
  }
}



  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
       <h1 className=' py-2 text-center font-semibold text-3xl'> Profile </h1>
    <form className='flex flex-col gap-4 '> 
      <input type="file" accept='image/*' ref={newPic} onChange={handleChange} className='hidden'  />
      <div className='w-32 h-32 self-center cursor-pointer 
       shadow-md overflow-hidden rounded-full'>
        
      <img onClick={onChoose} src={ previewImageUrl || currentUser.profilePhoto } alt='user'  className='rounded-full 
      w-full h-full object-cover border-8 border-[lightgray]'/>
        </div>  

        <TextInput type='text'  id='username' placeholder='username' defaultValue={currentUser.username}/>
        <TextInput type='email'  id='email' placeholder='email@mail' defaultValue={currentUser.email}/>
        <TextInput type='password'  id='password' placeholder='password' defaultValue=''/>
      
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