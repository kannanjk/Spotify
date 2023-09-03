import { Form, Input } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import axios from 'axios'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()
    const onFinishHandler = async(val)=>{
        const res = await axios.post('/auth/login',val)
        localStorage.setItem('token',res.data.user.token)
        navigate('/')
    }
  return (
    <>
      <div className="form-container">
        <Form layout='vertical' onFinish={onFinishHandler} className='register-form'>
            <h3 className='text-center'>Register</h3>
           
            <FormItem label='email' name='email'>
                <Input type='email' required />
            </FormItem>
            <FormItem label='Password' name='password'>
                <Input type='password' required />
            </FormItem>
            <Link to='/register' className='ms-2'>i dont have any account</Link>
            <button className='btn btn-primary' type='submit'>login</button>
        </Form>
    </div>
    </>
  )
}

export default Login