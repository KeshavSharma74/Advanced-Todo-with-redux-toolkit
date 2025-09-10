import React from 'react'
import { Button } from './components/ui/button'
import { Route,Routes } from 'react-router-dom'
import LoginForm from './components/login-form'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import About from './pages/About'
import Testimonial from './pages/Testimonial'
import Tasks from './pages/Tasks'
import ContactUs from './pages/ContactUs'
import { useEffect } from 'react'
import { checkAuth } from './features/authSlice'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {

    const dispatch = useDispatch();
    const user=useSelector(state=>state.auth.user);

  useEffect(() => {
    dispatch(checkAuth());
  },[]); // ❌ no dependency array → runs on every render

  return (
    <div> 
        <Navbar></Navbar>
        <Routes>
          <Route path='/login' element={ user?<Home></Home> : <LoginForm></LoginForm>} ></Route>
          <Route path='/' element={<Home></Home>} ></Route>
          <Route path='/about' element={<About></About>} ></Route>
          <Route path='/testimonial' element={<Testimonial></Testimonial>} ></Route>
          <Route path='/tasks' element={user?<Tasks></Tasks>:<LoginForm></LoginForm>} ></Route>
          <Route path='/contact' element={<ContactUs></ContactUs>} ></Route>
        </Routes>
    </div>
  )
}

export default App