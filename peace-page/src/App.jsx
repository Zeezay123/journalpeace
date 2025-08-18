import { useState } from 'react'
import { BrowserRouter, Link,Routes, Route } from 'react-router-dom'
import './App.css'
import Dashboard from './Pages/Dashboard'
import Home from './Pages/Home'
import About from './Pages/About'
import Blog from './Pages/Blog'
import Signup from './Pages/Signup'
import Signin from './Pages/Signin'
import Programmes from './Pages/Programmes'   
import HeaderMenu from './components/HeaderMenu'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import CreatePost from './Pages/CreatePost'
import UpdatePost from './Pages/UpdatePost'
import PostPage from './Pages/PostPage'
import Admision from './Pages/Admision'
import DashCourse from './components/DashCourse'
import DepartmentPage from './Pages/DepartmentPage'
import CreateJournal from './Pages/CreateJournal'
import JournalPage from './Pages/JournalPage'



function App() {


  return (
    <BrowserRouter>
    <HeaderMenu />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/posts' element={<Blog />} />
        <Route path='/programmes' element={<Programmes/>} />
        <Route path='/admision' element={<Admision/>} />

        <Route element={<PrivateRoute/>}>          
        <Route path='/dashboard' element={<Dashboard />} />
           </Route>

           <Route element={<PrivateRoute/>}>          
        <Route path='/create-post' element={<CreatePost />} />
        <Route path='/create-journal' element={<CreateJournal/>} />
        <Route path='/update-post/:postId' element={<UpdatePost />}/>
        {/* <Route path='/create-course' element={<DashCourse />}/> */}
           </Route>
        <Route path='/programmes/:id' element={<DepartmentPage/>}/>
        <Route path='/post/:postSlug' element={<PostPage />} />
        <Route path='/journal/:journalSlug' element={<JournalPage/>} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
