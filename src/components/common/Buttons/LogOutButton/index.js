import React from 'react'
import { useContext } from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'

import UserContext from '../../../../contexts/user'

import {FiLogOut} from 'react-icons/fi'

export default function LogOutButton({size, version}) {
    
    const history = useHistory()
    const {isLogged, clearUserContext} = useContext(UserContext)

    const onClick = () => {

        console.log('logout button')

        axios.post('/api/logout', {})
        .then(res => {
            console.log(res.data)
            console.log('clearUserContext')
            clearUserContext()
            history.push('/')
                        
        })
        .catch(err => {console.log(err.message)})


    }
    
    switch (version) {

        case 'form-account':
            return(
                <div
                    style={{display: 'flex', justifyContent: 'flex-end', fontSize: '16px', color: 'black', margin: '20px 0px'}}
                >   
                    <button 
                        style={{display: 'flex', justifyContent: 'flex-end', fontSize: '16px', color: 'black', margin: '0px', backgroundColor: 'transparent', cursor: 'pointer'}}
                        onClick={onClick}
                        type='button'
                    >
                        <FiLogOut style={{height: size || '24px', width: size || '20px', marginRight: '10px'}} />
                        <p>Log out</p>
                    </button>                    
                </div>
            )
        
        default:
            return(
                <>
                {isLogged === true ? 
                    <div className='btn__square  btn__square--small' onClick={onClick}>
                        <FiLogOut style={{height: size || '24px', width: size || '20px', color: 'var(--secondary_color--light)'}} />
                    </div>
                :
                    <div></div>
                }
                </>
                
            )
    }

}
