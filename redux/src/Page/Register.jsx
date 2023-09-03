import { Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import Link from 'antd/es/typography/Link';
import React from 'react'
import '../stayl/Register.css'
import axios, {} from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../Redux/Slice/UserSlice'
import { useNavigate } from 'react-router-dom';

function Register() {
    // const {user} = useSelector(state=>state.user)
    const navigate = useNavigate()
   const dispatch = useDispatch()
    const onFinishHandler = async(val)=>{
        const res = await axios.post('/auth/register',val)
           if (res) {
            dispatch(setUser(res.data.user))
            localStorage.setItem('token',res.data.user.token)
            navigate('/')
           }
           else{
            navigate('/register')
           }
    }
  return (
    <>
    <div className="form-container">
        <Form layout='vertical' onFinish={onFinishHandler} className='register-form'>
            <h3 className='text-center'>Register</h3>
            <FormItem label='Name' name='name' >
                <Input type='text' required />
            </FormItem>
            <FormItem label='email' name='email'>
                <Input type='email' required />
            </FormItem>
            <FormItem label='Password' name='password'>
                <Input type='password' required />
            </FormItem>
            <Link to='/login' className='ms-2'>Alredy user registerd</Link>
            <button className='btn btn-primary' type='submit'>Register</button>
        </Form>
    </div>
</>
  )
}

export default Register