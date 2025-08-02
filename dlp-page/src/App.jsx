import { useState } from 'react'
import { BrowserRouter, Link,Routes, Route } from 'react-router-dom'
import './App.css'
import Dashboard from './Pages/Dashboard'
import Home from './Pages/Home'
import About from './Pages/About'
import Blog from './Pages/Blog'
import Signup from './Pages/Signup'
import Signin from './Pages/Signin'
import Projects from './Pages/Projects'   
import HeaderMenu from './components/HeaderMenu'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import CreatePost from './Pages/CreatePost'



function App() {


  return (
    <BrowserRouter>
    <HeaderMenu />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/blog' element={<Blog />} />

        <Route element={<PrivateRoute/>}>          
        <Route path='/dashboard' element={<Dashboard />} />
           </Route>

           <Route element={<PrivateRoute/>}>          
        <Route path='/create-post' element={<CreatePost />} />
           </Route>

        <Route path='/projects' element={<Projects />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
