import React from 'react'
import ContactItem from './ContactItem'

export default function Contacts({ contacts, showMessage }) {
    
    const list = contacts.map((contact, index) => <ContactItem key={index} contact={contact} showMessageFor={(uid) => showMessage(uid)} />)
  return (
      <div className='bg-white shadow shadow-grey-400 w-1/4 flex flex-col overflow-auto space-y-3 p-3 divide-y-2'>
          {list}
    </div>
  )
}
