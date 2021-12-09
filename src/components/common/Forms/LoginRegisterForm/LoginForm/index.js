import React from 'react'
import { useContext, useState} from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';


import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import UserContext from '../../../../../contexts/user';

import '../style.css'


export default function LoginForm(){

    console.log('LoginForm rerender')

    const history = useHistory()
    const {setIsLogged, setUserID, setUserAccountData, updateAccountFavDishesStates} = useContext(UserContext)
    const [formMessage, setFormMessage] = useState({})
    const {register, handleSubmit} = useForm()
    
        
    const onSuccess = (data) => {

        //TODO: Validation
        if(data.login === '' || data.password === ''){
            setFormMessage({status: 'error', message: 'Email or Password are invalid'})
            return
        }

        axios.post('/api/login', data)
        .then(res => {

            if(res.data.status === 'error'){
                setFormMessage(res.data)
                return
            }

            //extract data from response object
            const userAccountData = res.data.data.userData
            const userAccountFavDishes = res.data.data.userFavDishes

                       
            //set fetched data in UserContext
            setIsLogged(true)
            setUserID(userAccountData.userID)
            setUserAccountData(userAccountData)
            updateAccountFavDishesStates(userAccountFavDishes)

            history.push('/')

        })
        .catch(err => console.log(err))
        
    }
    
    
    return(
       
        
        <div className='login_form'>
            <form onSubmit={handleSubmit(onSuccess)}>
            
                <h2>Login</h2>

                {formMessage && 
                    <div className={`serverMessage ${formMessage.status === 'error' ? 'errorMessage' : 'successMessage'}`}>
                        {formMessage.message}
                    </div>
                }

                <label>Email</label>
                <input  {...register('email')} ></input>
                
                <label>Password</label>
                <input  type='password' {...register('password')}></input>

                <Link to='#'> Forgot password?</Link>
                        
                <button type='submit'>Login</button>

                <div className='break_line'>
                    <span></span>
                    or
                    <span></span>
                </div>

                <span>
                    You don't have an account yet? <Link to='/registration'> Create an account</Link>
                </span>
                                    
            </form>
        </div>
       
        
    )
}



