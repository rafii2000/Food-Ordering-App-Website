import React from 'react'

import {ReactComponent as LocationIcon} from '../../../assets/icons/home/svg/location.svg'

import './style.css'

export default function UserLocation() {
    
    
    const city = 'Rzeszów'      //TODO: use locationAPI
    const country = 'PL'
    
    return (
        <div className='user_location'>
            <LocationIcon/>
            <span className='user_location__city'>{city},</span>
            <span className='user_location__country'>{country}</span>
        </div>
    )
}
