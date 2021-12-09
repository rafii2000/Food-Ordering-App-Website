import React from 'react'
import { useLocation } from 'react-router'

//components: templates
import DesktopPage from '../../../layouts-templates/desktop/DesktopPage'

//components: common
import LoginForm from '../../../common/Forms/LoginRegisterForm/LoginForm'
import RegistrationForm from '../../../common/Forms/LoginRegisterForm/RegistrationForm'


export default function LoginAndRegister() {

    const location = useLocation()
    
    return (
        <div className='login_and_register'>
            
            <DesktopPage sideBar={false}>
                        
                <>
                    {location.pathname === '/login' ? 
                        <LoginForm></LoginForm>
                    : 
                        <RegistrationForm></RegistrationForm>
                    }
                </>

                <></>
        
            </DesktopPage>

        </div>
    )
}
