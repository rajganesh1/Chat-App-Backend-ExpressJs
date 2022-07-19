import React, { useState } from 'react'
import Form from '../components/Form'
import Layout from './Layout'
import { apiInstance } from '../assets/api'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    
    const navigate = useNavigate()

    const [errors, setErrors] = useState("")

    function doLogin(payload)
    {
        apiInstance().post('user/login', payload).then(res => {
            console.log(res)
            localStorage.setItem('id', res.data.user.id);
            navigate('/chats')
        })
        .catch(err => {
            if (err.response)
                setErrors(err.response.data.errors);
        })
        console.log(payload);
    }
    
    return (
        <Layout>
            { errors && <div className="text-red-500">You have entered incorrect credentials</div> }
                <Form submitted={doLogin} />

        </Layout>
    )
}