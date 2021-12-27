
import { useState, useContext } from 'react'

import UserContext from '../../../contexts/user'

import {BsQuestionCircle} from 'react-icons/bs'

import './style.css'

export default function FormAutoFill({autoFillFromCache, autoFillFromAccount}){

    const {isLogged} = useContext(UserContext)
    const [description, showDescription] = useState(false)

    return(

        <div className='from__auto_fill_box'>

            <div className='auto_fill_box__options'>

                <span>
                    <button type='button'  onClick={autoFillFromCache}>Auto Fill from Cache</button>
                    {isLogged && <button type='button' onClick={autoFillFromAccount}>Auto Fill from Account</button>}
                </span>

                <span>
                    <BsQuestionCircle onClick={() => showDescription(!description)}/>
                </span>
                
            </div>

            {true &&
                <div className='auto_fill_box__description'  style={description ? {height: '150px', opacity: '1'} : {height: '0px',  opacity: '0'}}>
                    <p>                       
                        "Auto Fill from Cache" - payment form will be automatically filled with
                        cached data from the Account Tab or the last enter (not logged users)
                    </p>
                    <p>
                        "Auto Fill from Account" - payment form will be automatically
                        filled with data saved on your Account (only logged users)
                    </p>
                </div>
            }

        </div>


    )
}
