import React, {useState, useEffect} from 'react'
import { apiInstance } from '../assets/api'
import Button from './Button'
import {pusher} from '../assets/pusherconfig'

function MessageBox({id, getMessage}){

    const [message, setMessage] = useState("")

    function send()
    {
        //console.log(id,   "this is the rec_id");
        apiInstance().post('message/send', {
            rec_id: id,
            text: message
        }).then(res => {
            getMessage(true)
            setMessage("")
        })
    }

    function handleEnterKey(e)
    {
        if(e.key=="Enter" || e.key=='return') 
        send()
    }


    return(
        <div className={`w-full mt-auto ml-2`}>
            <div className='flex flex-row'>
            <input type="text" 
            onChange={(e)=>setMessage(e.target.value)}
            onKeyPress={handleEnterKey}
            value={message}
            className="p-2 border border-blue-100 bg-sky-100 bg-opacity-40
            text-gray-900 outline-none shadow rounded w-[90%]" placeholder='Type your message here' />
            <Button onClick={send}>Send</Button>
            </div>
        </div>
    )
}


function Message({text, isSender}){
    return(
    <div className="w-full">    
        <div className={`${isSender ? 'bg-blue-500 text-gray-50 float-right' : 'bg-sky-900 text-gray-50 float-left'} 
        max-w-md py-3 px-8 rounded-3xl` }>
            {text}
        </div>
    </div>
    )
}


function MessageList({messages,contacts}){
    const id = localStorage.getItem('id')
    const list = messages.map((msg, index) => <Message text={msg.content} isSender={msg.sender == id} key={index}/>)

    return (
        <div className="flex flex-col p-2 overflow-y-auto space-y-3">
            {list}
        </div>
    )
}



export default function Messages({recipient, contacts}) {

    const [messages, setMessages] = useState([]) 

    function getMessages()
    {
        apiInstance().get(`message/${recipient}`).then(res => {
            //console.log(recipient);
            setMessages(res.data)
        })
    }

    const sender_id = localStorage.getItem('id')

    useEffect(() => {
        var channel = pusher.subscribe(`channel-${sender_id}`);
        channel.bind(`event-${sender_id}`, function(data) {
          //console.log(data)
          if(sender_id != data.sender_id)
          { 
            getMessages()
          }
        });
  }, [sender_id])

    useEffect(()=>{
        getMessages()
    },[recipient])


    return (
        <div className="flex flex-col w-full overflow-hidden">
            <MessageList messages={messages} contacts={ contacts} />
                <MessageBox id={recipient} getMessage={(val)=>getMessages()} />  
        </div>
    )
}