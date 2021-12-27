import React from 'react'
import { Link } from 'react-router-dom'

import './style.css'

export default function NamedSection({children, name, link, mt, mb, ml, mr} ) {
    
    const styles = {
        marginTop: mt,
        marginBottom: mb,
        marginLeft: ml,
        marginRight: mr,
    }
    
    return (
        <section className='named_section' style={styles}>

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
