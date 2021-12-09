import React from 'react'
import { useState } from 'react'

import { Link } from 'react-router-dom'
import {BsExclamationCircle} from 'react-icons/bs'  //BsQuestionCircle

import './style.css'

export default function UserNotLoggedPrompt(){

    const [content, toggleContent] = useState(false)

    return(
        <div className='user_not_logged_prompt' style={content === true ? {height: '165px'} : {height: '35px'}}>

            <span onClick={() => {toggleContent(!content)}}>
                <span>
                    <BsExclamationCircle/>
                    <p>You are not logged in</p>
                </span>

                <span>
                    <button type='button'>Read more</button>
                </span>
               
            </span>
            

            {content &&

                <div className='user_not_logged_prompt__more'>
                    <p>
                        All your favorite dishes and personal information inputted here are stored
                        in LocalStorage on your device. This data might lose in
                        every moment, for example when you clear browser cash.
                        To avoid this you must have an account!
                    </p>

                    <div className='user_not_logged_prompt__more__hyperlinks'>
                        <Link to='./login'>Log in to your account</Link>
                        or
                        <Link to='./registration'>Create an account</Link>
                    </div>

                </div>
                
            }
            
        </div>
    )
}