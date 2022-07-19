import React from 'react'
import { Outlet , Navigate } from 'react-router-dom';
import { useAuth } from '../assets/auth';

export default function Protected() {
    const isAuth = useAuth();
  return (
        isAuth ? <Outlet /> : <Navigate to='/' />
  )
}
