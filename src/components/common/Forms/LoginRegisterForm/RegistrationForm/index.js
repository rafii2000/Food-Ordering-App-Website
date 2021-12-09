import React from 'react'
import { useForm } from "react-hook-form";
import { useState } from 'react';

import { Link } from 'react-router-dom';

import axios from 'axios';

import '../style.css'

export default function RegistrationForm(){

    const {register, handleSubmit} = useForm()
    const [formMessage, setFormMessage] = useState({})

    const onSuccess = (data) => {
        console.log('Data sends to server', data)
        
        //TODO: validation
        if(data.email === '' || data.password === ''){
            setFormMessage({status: 'error', message: 'Email or Password are invalid'})
            return
        }
        else if(data.password !== data.repeatPassword){
            setFormMessage({status: 'error', message: 'Passwords are different'})
            return
        }

        
        axios.post('/api/signin', data)
        .then(res => {
            setFormMessage(res.data)
        })
        .catch(err => console.log(err))
    }

    return(
       
        <div className='login_form'>
            <form onSubmit={handleSubmit(onSuccess)}>
                
                <h2>Registration</h2>
                
                {formMessage && 
                    <div className={`serverMessage ${formMessage.status === 'error' ? 'errorMessage' : 'successMessage'}`}>
                        {formMessage.message}
                    </div>
                }
                

                <label>Email</label>
                <input  {...register('email')} ></input>
                
                <label>Password</label>
                <input  type='password' {...register('password')}></input>

                <label>Repeat Password</label>
                <input  type='password' {...register('repeatPassword')}></input>

                <Link to='#'></Link>
                        
                <button type='submit'>Register</button>

                <div className='break_line'>
                    <span/>or<span/>
                </div>

                <div></div>

                <span>
                    Already have an account? <Link to='/login'> Login to your account</Link>
                </span>
                                    
            </form>
        </div>
        
    )
}



