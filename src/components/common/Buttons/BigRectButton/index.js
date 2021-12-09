
import React from 'react'

export default function RectButton({children, btnStyle, btnType, onClick}) {
    
    
    switch (btnStyle) {
        case 'primary':
            return(
                <button className='btn__rect  btn__rect--big  btn__background--primary_color'
                    type={btnType || 'button'}    
                    onClick={onClick}
                >
                    {children}
                </button>
            )
            
        default:
            return(
                <button className='btn__rect  btn__rect--big  btn__background--accent_color'
                    type={btnType || 'button'}
                    onClick={onClick}
                >
                    {children}
                </button>
            )
            
    }

}


