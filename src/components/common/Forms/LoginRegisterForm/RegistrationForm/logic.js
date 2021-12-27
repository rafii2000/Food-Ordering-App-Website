import { useForm } from "react-hook-form";
import { useState } from 'react';
import axios from 'axios';

export default function useRegistrationForm() {
    
    const {register, handleSubmit, formState: {errors}, setError, clearErrors} = useForm()

    const [formMessage, setFormMessage] = useState({})

    const onSuccess = (data) => {

        //console.log('Data sends to server', data)
        
        if(ValidateInputs(data) === false) return

        axios.post('/api/signin', data)
        .then(res => {
            setFormMessage(res.data)
        })
        .catch(err => console.log(err))
    }

    const ErrorsMessages = {

        empty: 'This filed is required',
        email: 'Please input a valid address e-mail',
        lengthUsername: 'Username must be at least 5 characters long',    
        lengthPassword: 'Password must be at least 8 characters long',  
        upperCase: 'Password must contains upper case letters',
        lowerCase: 'Password must contains lower case letters',
        numbers: 'Password must contains numbers',
        diffrentPasswords: "Passwords are diffrent",
        usernameExist: 'This username is already used',
        emailExist: 'This e-mail is already used',
        serverError: 'Server internal error. Try again later'
    }

    const resetErrorMessages = () => {
        
        clearErrors()
    }


    const ValidateInputs = (data) => {
      
        let anyError = 0;
        anyError += ValidateEmail(data.email);
        anyError += ValidatePasswords(data.password1, data.password2)
            
        if(anyError === 0) return true
        else return false
    }

    const ValidateEmail = (email) => {
        const emailPattern =  new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        
        if(email === ''){
            setError('email', {type: 'client_validation', message: ErrorsMessages.empty})
            return 1
        };

        if(emailPattern.test(email) === false){
            setError('email', {type: 'client_validation', message: ErrorsMessages.email})
            return 1
        };

        return 0

    }

    const ValidatePasswords = (pas1, pas2) => {
        //const passwordPattern =  new RegExp('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}');
        const upperCasePattern =  new RegExp('(?=.*[A-Z])');
        const lowerCasePattern =  new RegExp('(?=.*[a-z])');
        const numbersPattern =  new RegExp('(?=.*[0-9])');

        if(pas1 === ''){
            setError('password1', {type: 'client_validation', message: ErrorsMessages.empty})
            return 1
        }

        if(pas1.length < 8){
            setError('password1', {type: 'client_validation', message: ErrorsMessages.lengthPassword})
            return 1
        }

        if(upperCasePattern.test(pas1) === false){
            setError('password1', {type: 'client_validation', message: ErrorsMessages.upperCase})
            return 1
        };

        if(lowerCasePattern.test(pas1) === false){
            setError('password1', {type: 'client_validation', message: ErrorsMessages.lowerCase})
            return 1
        };

        if(numbersPattern.test(pas1) === false){
            setError('password1', {type: 'client_validation', message: ErrorsMessages.numbers})
            return 1
        };
        

        if(pas2 === ''){
            setError('password2', {type: 'client_validation', message: ErrorsMessages.empty})
            return 1
        }

        if(pas1 !== pas2){
            setError('password2', {type: 'client_validation', message: ErrorsMessages.diffrentPasswords})
            return 1
        }

        return 0

    }

    
    
    
    return {
        formMessage: formMessage,
        errors: errors,
        onSuccess,


        //useForm
        register,
        handleSubmit,
    }

}
