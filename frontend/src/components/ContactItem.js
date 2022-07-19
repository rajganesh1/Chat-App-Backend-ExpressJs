import React, {useState, useEffect} from 'react'
import {pusher} from '../assets/pusherconfig'


export default function ContactItem({contact, showMessageFor}) {

    const [showDot, setShowDot] = useState(false)

    const sender_id = localStorage.getItem('id')

    useEffect(() => {
          var channel = pusher.subscribe(`channel-${sender_id}`);
          channel.bind(`event-${sender_id}`, function(data) {
            console.log(data)
            if(sender_id != data.sender_id)
            { 
                setShowDot(true)
            }
          });
    }, [])

        
      
    function handleClick()
    {
        showMessageFor(contact.id)
        setShowDot(false)
    }

   

    return (
        <div className="flex items-center space-x-3 pt-6 cursor-pointer" onClick={() => handleClick()}>
            <div className="w-12 h-12 rounded-full bg-gray-200"></div>
            <div>{contact.name}</div>
            {showDot && <div className="w-5 h-5 bg-sky-500 rounded-full"></div>}
        </div>
    )
}