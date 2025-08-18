import { Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Modal,ModalBody,ModalHeader } from 'flowbite-react';
import React from 'react'
import { useState, useEffect } from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom';

const DashJournal = () => {

const [userJournal, setUserJournal] = useState([]);
const {currentUser} = useSelector((state)=> state.user)
const [showMore, setShowMore] = useState(true);
const [showModal, setShowModal] = useState(false)
const [journalIdToDelete, setJournalIdToDelete] = useState('')
const navigate = useNavigate()


useEffect(()=>{
    const fetchJournal = async () =>{

        try{
    console.log('Fetching journals for user:', currentUser._id);
    
     const res = await fetch(`/api/journal/getjournals?userId=${currentUser._id}`)
    
    console.log('Response status:', res.status);
    console.log('Response headers:', res.headers.get('content-type'));
    
    // Check if response is ok before trying to parse JSON
    if (!res.ok) {
      console.error('API response not ok:', res.status, res.statusText);
      return;
    }
    
    // Check if response has content
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Response is not JSON:', contentType);
      return;
    }
       const responseText = await res.text();
    console.log('Raw response:', responseText);
      
    


 if (responseText) {
      const data = JSON.parse(responseText);
      console.log('Parsed data:', data);
      
      if (data.journals) {
        setUserJournal(data.journals);
        // Check if we got less than 9 posts, meaning no more posts to load
        if (data.journals.length < 9) {
          setShowMore(false);
        }
      } else {
        console.log('No posts in response');
        setUserJournal([]);
        setShowMore(false);
      }
    } else {
      console.log('Empty response');
      setUserJournal([]);
      setShowMore(false);
    }

  } catch (error) {
    console.error('Error fetching journals:', error);
    setUserJournal([]);
    setShowMore(false);
  }
}

if (currentUser && currentUser.isAdmin) {
  fetchJournal()
}
 
}, [currentUser])




const handleShowMore = async()=>{
 const startIndex = userJournal.length
 try {
   console.log('Loading more posts, startIndex:', startIndex);
   const res = await fetch(`/api/journal/getjournals?userId=${currentUser._id}&startIndex=${startIndex}`)
   
   if (!res.ok) {
     console.error('Show more API response not ok:', res.status, res.statusText);
     return;
   }
   
   const responseText = await res.text();
   console.log('Show more raw response:', responseText);
   
   if (responseText) {
     const data = JSON.parse(responseText);
     console.log('Show more parsed data:', data);
     
     if (data.journals) {
       setUserJournal((prev) => [...prev, ...data.journals]);
       if (data.journals.length < 9) {
         setShowMore(false);
       }
     }
   }
 } catch (error) {
   console.error('Error in handleShowMore:', error);
 }
}

const handleDelete= async ()=>{
  setShowModal(false)
 try {
  const res = await fetch(`/api/journal/deletejournal/${journalIdToDelete}/${currentUser._id}`, {
    method:"DELETE",
     headers:{
      'Content-Type':'application/json'
    },
  })

  const data = await res.json()
if(!res.ok){
  console.log(data.message)
}else {
   setUserJournal((prev) => prev.filter((journal)=>journal._id !== journalIdToDelete))
}
 } catch (error) {
  console.log(error)
 }

}

  return (
    <div className='flex flex-col max-w-7xl mx-auto items-center'>
<Link >  <Button className='max-w-56'>Create Journal</Button></Link> 

    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar 
    scrollbar-track-slate-100 scrollbar-thumb-amber-400 dark:scrollbar-track-slate-700
    dark:scrollbar-thumb-slate-500'>  

    
   {
     currentUser.isAdmin && userJournal.length > 0 ? (
     <>
    <Table className='shadow-md' hoverable>
      <TableHead>
        <TableHeadCell>Date Updated</TableHeadCell>
        <TableHeadCell>Journal Pdf</TableHeadCell>
        <TableHeadCell>Journal title</TableHeadCell>
        <TableHeadCell> <span>  Delete</span></TableHeadCell>
      </TableHead>
      <TableBody className='divide-y'>
        {userJournal.map((journals) => (
          <TableRow key={journals._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
            <TableCell>{new Date(journals.updatedAt).toLocaleDateString()}</TableCell>
            <TableCell>
           <a href="https://res.cloudinary.com/dcwmfyggt/raw/upload/v1755443638/t0onb3le6qvibcmhes6c.pdf">
                  Download PDF
            </a>
            </TableCell>
            <TableCell>
              <Link className='font-medium text-gray-900 dark:text-white' to={`/journal/${journals.slug}`}>
                {journals.filename}
              </Link>
            </TableCell>
            <TableCell>
              <span 
              onClick={ ()=>{
          
          setShowModal(true)
          setJournalIdToDelete(journals._id)
          
          }}
              className='font-medium text-red-500 hover:underline cursor-pointer'>
                Delete
              </span>
            </TableCell>
          
          </TableRow>
        ))}
      </TableBody>
    </Table>
  {
   showMore && 
    <button onClick={handleShowMore} className='w-full text-blue-600 self-center text-sm py-7'>
    Show more
    </button>
  }

       </>
     ) : (<div> no journal yet </div>)
   }

   <Modal show={showModal} onClose={()=>setShowModal(false)} popup size='md'>
       <ModalHeader/>
       <ModalBody>
         <div className='tect-center flex flex-col items-center justify-center'>
   <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400
   dark:text-gray200 mb-4 mx auto'/>
   
   <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
     Are you sure?
   </h3>
   
   <div className='flex gap-5 items-center'>
     <Button color="red" onClick={handleDelete}> Yes am sure!</Button>
   
     <Button color="gray" onClick={()=>setShowModal(false)}>No,Cancel</Button>
   </div>
         </div>
       </ModalBody>
      </Modal>
   
   </div></div>
  )
}



export default DashJournal