import React from 'react'
import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react'
import {HiUser, HiArrowSmRight} from 'react-icons/hi'
import { useLocation, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const DashSidebar = () => {
  const location = useLocation();
 const [tab, setUseTab] = useState('')

 useEffect(()=>{
  // Get the tab from the URL query parameters
  // This assumes the URL is like /dashboard?tab=someTab
  const urlParams = new URLSearchParams(location.search) // 
  const tabFromUrl = urlParams.get('tab') 
 
if(tabFromUrl){
  setUseTab(tabFromUrl)
}
 
 }, [location.search])
  return (
    <Sidebar className='w-full md:w-56'>
   <SidebarItems>
    <SidebarItemGroup>
   <Link to='/dashboard?tab=profile' >  <SidebarItem active={tab === 'profile'} icon={HiUser} label={'User'} labelColor='dark'>
      Profile
     </SidebarItem></Link>
     <SidebarItem  icon={HiArrowSmRight}> Sign Out </SidebarItem>
    </SidebarItemGroup>
   </SidebarItems>
    </Sidebar>
  )
}

export default DashSidebar