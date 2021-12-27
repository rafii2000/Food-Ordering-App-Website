import React from 'react'

import { Link } from 'react-router-dom';
import useRegistrationForm from './logic';

import '../style.css'

export default function RegistrationForm(){
    
    const { register, handleSubmit, onSuccess, formMessage, errors } = useRegistrationForm()
    
    return(
       
        <div className='login_form'>
            <form onSubmit={handleSubmit(onSuccess)}>
                
                <h2>Registration</h2>
                
                {formMessage && 
                    <div className={`serverMessage ${formMessage.status === 'error' ? 'errorMessage' : 'successMessage'}`}>
                        {formMessage.message}
                    </div>
                }
                
                <label>E-mail</label>
                <input {...register('email')} error={errors.email ? 'true' : 'false'}></input>
                <p>{errors.email ? errors.email.message : ''}</p>
                
                <label>Password</label>
                <input type='password' {...register('password1')} error={errors.password1 ? 'true' : 'false'}></input>
                <p>{errors.password1 ? errors.password1.message : ''}</p>

                <label>Repeat Password</label>
                <input type='password' {...register('password2')} error={errors.password2 ? 'true' : 'false'}></input>
                <p>{errors.password2 ? errors.password2.message : ''}</p>

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



