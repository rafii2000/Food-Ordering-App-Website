import React from 'react'
import { useContext } from 'react'

import UserContext from '../../../contexts/user'

import './style.css'

export default function Header() {

    const {userAccountData} = useContext(UserContext)

    return (
        
        <div className='hero_message'>
            <h1>Hey {userAccountData && userAccountData.firstName}!</h1>
            <h3>Let's get your order</h3>
        </div>
    )
}
