import React, { useState} from 'react'
import Form from '../components/Form'
import Layout from './Layout'
import { apiInstance } from '../assets/api'
import { useNavigate } from 'react-router-dom'
export default function Register() {

    const navigate = useNavigate()

    const [errors, setErrors] = useState("")

    function doRegister(payload)
    {
        apiInstance().post('user/register', payload).then(res => {
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

            <Form isLogin={false} submitted={doRegister} />
                
        </Layout>
    )
}