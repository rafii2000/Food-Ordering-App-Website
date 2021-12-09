import React from 'react'
import { useLocation } from 'react-router'

import Navigation from '../../../common/Navigation'

import './style.css'

export default function Page({children}) {
        
    const location = useLocation()

    if(location.state && location.pathname !== location.state.prefUrl){
        // scrollToTop
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        location.state.prefUrl = location.pathname
    }

    return (
        <div className='mobile_page'>
            
            <div className='mobile_page__top_bar'>
                {children[0]}
            </div>

            <div className='mobile_page__content'>
                {children[1]}
            </div>

            <div className='mobile_page__nav_bar'>
                <Navigation/>
            </div>
            
        </div>
    )

    
}
