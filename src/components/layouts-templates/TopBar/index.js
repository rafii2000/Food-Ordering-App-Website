import React from 'react'

import './style.css'

export default function TopBar({left, middle, right}) {
    return (
        <div className='top_bar'>
            <div className='top_bar__left'>
                {left}
            </div>

            <div className='top_bar__middle'>
                {middle}
            </div>

            <div className='top_bar__right'>
                {right}
            </div>
        </div>
    )
}
