import React from 'react'
import { useEffect } from 'react';

import './style.css'

export default function Subpage({children}) {
    
    useEffect(() => {
        // //scrollToTop
        // musi byc na useEffect tylko przy pierwszym renderowaniu
        // document.body.scrollTop = 0;
        // document.documentElement.scrollTop = 0;

        window.scrollTo({
            top: 0, 
            left: 0, 
            behavior: 'smooth'
        })

    }, [])

    

    return (
        <div className='subpage'>
            
            <div className='subpage__top_bar'>
                {children[0]}
            </div>

            <div className='subpage__content'>
                {children[1]}
            </div>

        </div>
    )
}
