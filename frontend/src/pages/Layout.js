import React from 'react'
import Header from '../components/Header'

export default function Layout({children}) {
    return (
        <div>
            <Header />
            <div div className = 'h-[80vh] overflow-hidden flex'>
                {children}
            </div>
        </div>
    )
}
