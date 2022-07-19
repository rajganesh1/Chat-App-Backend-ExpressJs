import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Chats from './pages/Chats';
import Protected from './components/Protected';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route element = {<Protected />} >
           <Route path='/chats' element={<Chats />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
