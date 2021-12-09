import React from 'react'

import {ReactComponent as MenuIcon} from '../../../../assets/icons/buttons/svg/menu.svg'
import { Link } from 'react-router-dom'
// import '../style.css'

export default function MenuButton() {
    
    return (
        <Link to=''>
            <div className='btn__square  btn__square--small'>
                <MenuIcon/>
            </div>
        </Link>
    )

}
