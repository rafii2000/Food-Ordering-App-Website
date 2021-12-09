import React from 'react'
import { useContext } from 'react'
import { Route, Link } from 'react-router-dom'
import UserContext from '../../../contexts/user'

import DesktopPage from '../../layouts-templates/desktop/DesktopPage'
import MobilePage from '../../layouts-templates/mobile/Page'

import './style.css'

const ProtectedRouteMessage = () => {
    
    if(window.innerWidth > 850)

        return(
            <DesktopPage>
                <div className='protected_resource_message'>
                    <p>This page is available only for logged in users</p>
                    <p>Your data are store in LocalStorage. In every moment you can lose all your saved information.</p>
                    <p>To save your choices create an account.</p>
                    <Link to='login'>Login to your account</Link>
                </div>
                <></>
            </DesktopPage>
        )
    else
        return(
            <MobilePage>
                <></>
                <div className='protected_resource_message'>
                    <p>This page is available only for logged in users</p>
                    <p>Your data are store in LocalStorage. In every moment you can lose all your saved information.</p>
                    <p>To save your choices create an account.</p>
                    <Link to='login'>Login to your account</Link>
                </div>
            </MobilePage>
        )
}

export default function ProtectedRoute({path, component}) {
    
    
    const {isLogged} = useContext(UserContext)

    switch (isLogged) {
        case true:
            return(<Route path={path} component={component}></Route>)
        case false:
            return(<Route path={path} component={ProtectedRouteMessage}></Route>)
            
        default:
            break;
    }
       
}
