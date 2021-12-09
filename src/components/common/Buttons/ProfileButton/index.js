import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import {ReactComponent as ProfileIcon} from '../../../../assets/icons/buttons/svg/profile.svg'
import {FiUser} from 'react-icons/fi'
import UserContext from '../../../../contexts/user'


// import '../style.css'

export default function ProfileButton() {
    
    const {isLogged} = useContext(UserContext)
   
   
    const iconStyle = () => {
        if(window.innerWidth > 850)
            return {width: '27px', height: '27px', color: 'var(--secondary_color--light)'}
        else
            return {width: '25px', height: '25px', color: 'black'}
    }


    return (

        <>
        {isLogged === true ?
            
            <Link to='/account'>
                <div className='btn__square  btn__square--small'>
                    <ProfileIcon/>
                </div>
            </Link>

        :
            <Link to='/login'>
                <div className='btn__square  btn__square--small'>
                    <FiUser style={iconStyle()} />
                </div>
            </Link>
        }
        </>
        
    )

}
