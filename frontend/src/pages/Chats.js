import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import { apiInstance }  from '../assets/api'
import Contacts from '../components/Contacts'
import Messages from '../components/Messages'


export default function Chats() {

    const [contacts, setcontacts] = useState([]);//learn purpose
    const [id, setid] = useState(localStorage.getItem('id'));
    const [recipient, setrecipient] = useState("");
    //const my_id = localStorage.getItem('id');

    useEffect(() => {
        apiInstance().get(`user/contacts/${id}`).then(res => {
            setcontacts(res.data);
        }).catch(err => console.log(err));
    }, [id])
     
  return (
      <Layout>
          <div className='h-full w-full overflow-hidden flex items-stretch'>
              <Contacts contacts={contacts} showMessage={(uid) => setrecipient(uid)} />
              {recipient && <Messages recipient={recipient} contacts={contacts} />}
          </div>
    </Layout>
  )
}
