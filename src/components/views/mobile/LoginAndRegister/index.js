import React from 'react'
import { useLocation } from 'react-router'

import Subpage from '../../../layouts-templates/mobile/Subpage'
import TopBar from '../../../common/TopBar'
import ReturnButton from '../../../common/Buttons/ReturnButton'
import MoreButton from '../../../common/Buttons/MoreButton'

import LoginForm from '../../../common/Forms/LoginRegisterForm/LoginForm'
import RegistrationForm from '../../../common/Forms/LoginRegisterForm/RegistrationForm'


export default function LoginAndRegister() {
    
    const location = useLocation()
        
    return (
        <div className='login_and_register'>
            
            <Subpage>

                <TopBar
                    left={<ReturnButton/>}
                    right={<MoreButton/>}
                />
                
                {location.pathname === '/login' ?
                    <LoginForm></LoginForm>
                :
                    <RegistrationForm></RegistrationForm>
                }
                
               
            </Subpage>
           
        </div>
    )
}
