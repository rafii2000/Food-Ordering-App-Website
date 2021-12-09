import React from 'react'
import { Link } from 'react-router-dom'

import './style.css'

export default function NamedSection({children, name, link}) {
    
    
    return (
        <section className='named_section'>

            <div className='named_section__top'>
                <h3>{name}</h3>
                <Link to='#'>{link}</Link>
            </div>

            <div className='named_section__content'>
                {children}
            </div>
            
        </section>
    )
}
