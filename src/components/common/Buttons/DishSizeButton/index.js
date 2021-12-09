import React from 'react'

// import '../style.css'

export default function DishSizeButton({dishSize, active, setActiveDishSizeButton}) {
    
    return (

        active === true ?
        <div className='btn__square--active  btn__square--medium btn__square--shadow'>{dishSize}</div>
        :
        <div className='btn__square  btn__square--medium btn__square--shadow'
            onClick={() => setActiveDishSizeButton(dishSize)}
        >
            {dishSize}
        </div>
        
    )

}
