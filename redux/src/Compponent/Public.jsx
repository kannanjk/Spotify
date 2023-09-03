import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import axios, { } from 'axios'
import { useDispatch } from 'react-redux'
import { setUser } from '../Redux/Slice/UserSlice'
 
function Public({ children }) { 
  const dispatch = useDispatch()
  const obj = {
    user: localStorage.getItem('token'),
    token: localStorage.getItem('token') 
  }
  const getUser = async () => {
    const res = await axios.post('/auth/getuser',obj)
    if (res.data.success) {
       dispatch(setUser(res.data.user))
    }
  }
  useEffect(() => {
    getUser()
  }) 
  if (localStorage.getItem('token')) {
    return children
  } else {
    return <Navigate to='/login' />
  }
}

export default Public