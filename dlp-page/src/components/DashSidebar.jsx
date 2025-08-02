import React from 'react'
import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react'
import {HiUser, HiArrowSmRight} from 'react-icons/hi'
import { useLocation, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { signOutSuccess } from '../Redux/user/slice'
import { useDispatch } from 'react-redux'

const DashSidebar = () => {
  const location = useLocation();
 const [tab, setUseTab] = useState('')
 const dispatch = useDispatch()

 useEffect(()=>{
  // Get the tab from the URL query parameters
  // This assumes the URL is like /dashboard?tab=someTab
  const urlParams = new URLSearchParams(location.search) // 
  const tabFromUrl = urlParams.get('tab') 
 
if(tabFromUrl){
  setUseTab(tabFromUrl)
}
 
 }, [location.search])



 
 const handleSignout =async()=>{
   try{
     const res = await fetch('/api/users/signout', {
       method:'POST',
     })
     
     const data = res.json()
     if(!res.ok){
       console.log(error.message)
     }
    else{
     dispatch(signOutSuccess())
    }
   }catch(error){
     console.log(error.message)
   }
 }
 
  return (
    <Sidebar className='w-full md:w-56'>
   <SidebarItems className='cursor-pointer'>
    <SidebarItemGroup>
   <Link to='/dashboard?tab=profile' >  <SidebarItem as='div' active={tab === 'profile'} icon={HiUser} label={'User'} labelColor='dark'>
      Profile
     </SidebarItem></Link>
  <SidebarItem  icon={HiArrowSmRight} onClick={handleSignout}> Sign Out </SidebarItem>
    </SidebarItemGroup>
   </SidebarItems>
    </Sidebar>
  )
}

export default DashSidebar