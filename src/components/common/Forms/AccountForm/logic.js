
import { useState, useContext } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';

import UserContext from '../../../../contexts/user'

import { useLocalStorage } from '../../../../hooks/useLocalStorage';




export function useAccountForm(){

    console.log('useAccountForm rerender')
    
    const formGroupsEnum = {
        ACCOUNT: 'editAccount',
        CONTACT: 'editContact',
        DELIVERY: 'editDelivery',
    }

    const { updateUserDataInLocalStorage } = useLocalStorage()

    const [editAccount, setEditAccountFlag] = useState(!false)
    const [editContact, setEditContactFlag] = useState(!false)
    const [editDelivery, setEditDeliveryFlag] = useState(!false)

    const {isLogged, userID, userAccountData, userCachedData, setUserAccountData, setUserCachedData} = useContext(UserContext)

    const formValues = () => {
        
        if(isLogged)
            return {

                credentials: {
                    userID:             (userAccountData && userAccountData.userID)          ||  null,
                    email:              (userAccountData && userAccountData.email)           ||  null,
                    password:           (userAccountData && userAccountData.password)        ||  null,
                    repeatPassword:     null,
                },
               
                userData: {
                    userID:             (userAccountData && userAccountData.userID)          ||  null,
                    email:              (userAccountData && userAccountData.email)           ||  null,
                    isVerified:         (userAccountData && userAccountData.isVerified)      ||  null,
                    
                    firstName:          (userAccountData && userAccountData.firstName)       ||  null,
                    lastName:           (userAccountData && userAccountData.lastName)        ||  null,
                    phoneNumber:        (userAccountData && userAccountData.phoneNumber)     ||  null,
        
                    city:               (userAccountData && userAccountData.city)            ||  null,
                    street:             (userAccountData && userAccountData.street)          ||  null,
                    streetNumber:       (userAccountData && userAccountData.streetNumber)    ||  null,
                    apartmentNumber:    (userAccountData && userAccountData.apartmentNumber) ||  null,
                    floor:              (userAccountData && userAccountData.floor)           ||  null,
                }
                            
            }

        if(!isLogged)
    
            return {

                credentials: {
                    // userID:             (userCachedData && userCachedData.userID)           ||  null,
                    email:              (userCachedData && userCachedData.email)            ||  null,
                    // password:           (userCachedData && userCachedData.password)         ||  null,
                    // repeatPassword:     null,
                },
                
                userData: {
                    // userID:             (userCachedData && userCachedData.userID)           ||  null,
                    email:              (userCachedData && userCachedData.email)            ||  null,

                    firstName:          (userCachedData && userCachedData.firstName)        ||  null,
                    lastName:           (userCachedData && userCachedData.lastName)         ||  null,
                    phoneNumber:        (userCachedData && userCachedData.phoneNumber)      ||  null,
        
                    city:               (userCachedData && userCachedData.city)             ||  null,
                    street:             (userCachedData && userCachedData.street)           ||  null,
                    streetNumber:       (userCachedData && userCachedData.streetNumber)     ||  null,
                    apartmentNumber:    (userCachedData && userCachedData.apartmentNumber)  ||  null,
                    floor:              (userCachedData && userCachedData.floor)            ||  null,
                }
                
            }

    }

    const {register, reset, getValues } = useForm({
        defaultValues: formValues()
    })


    const edit = (formGroup) => {
        
        //toggles input's disabled attribute
        switch (formGroup) {

            case formGroupsEnum.ACCOUNT:
                setEditAccountFlag(!editAccount)
                break;

            case formGroupsEnum.CONTACT:
                setEditContactFlag(!editContact)
                break;

            case formGroupsEnum.DELIVERY:
                setEditDeliveryFlag(!editDelivery)
                    break;
            default:
                break;
        }
        
    }

    const close = (formGroup) => {
        
        edit(formGroup) //toggle edit flag
        reset(formValues())
    }

    const save = (formGroup) => {
        
        edit(formGroup) //toggle edit flag

        const newUserData = getValues('userData')

        console.log('userData', userAccountData)
        console.log('newUserData', newUserData)


        //compare new and current data before send request
        if(JSON.stringify(userAccountData) === JSON.stringify(newUserData)) return

           
        //save userData depends on isLogged state
        switch (isLogged) {
            case true:
                
                //update data in userContext
                const deepCopy = JSON.parse(JSON.stringify(newUserData))    //prevent referential equality
                setUserAccountData(deepCopy)

                //update data in database
                axios.put(`/api/users/${userID}`,  {userID: userID, data: newUserData})
                .then(res => console.log(res.data)) //TODO: show modal message on success
                .catch(err => console.log(err))     //TODO: show modal message on error

                break;

            case false:
                setUserCachedData(newUserData) //update data in userContext
                updateUserDataInLocalStorage(newUserData) //update data in localStorage
                break;
        
            default:
                break;
        }
    }

    const saveCredentials = (formGroup) => {
        
        edit(formGroup)

        const newCredentials = getValues('credentials')
        const newUserData = getValues('userData')

        //save userData depends on isLogged state
        switch (isLogged) {
            case true:
                
                //update password in database
                if(newCredentials.password){
                    if(newCredentials.password === newCredentials.repeatPassword){
                        
                        const requestData = {
                            password: newCredentials.password,
                            repeatPassword: newCredentials.repeatPassword
                        }

                        axios.put(`/api/users/${userID}/password`, requestData)
                        .then(res => console.log(res.data)) //TODO: show message on success
                        .catch(err => console.log(err))     //TODO: show message on error
                    }
                    else{
                        reset(formValues())
                    }
                }

                //update email in database
                if(userAccountData.email !== newCredentials.email){
                                        
                    axios.put(`/api/users/${userID}/email`, {email: newCredentials.email})
                        .then(res => console.log(res.data)) //TODO: show message on success
                        .catch(err => console.log(err))     //TODO: show message on error
                }

                //update email in userContext
                newUserData.email = newCredentials.email
                setUserAccountData(newUserData) //order is important, setUserAccountData(newUserData) operation, must be after if statement

                break;

            case false:

                newUserData.email = newCredentials.email
                setUserCachedData(newUserData) //update data in userContext
                updateUserDataInLocalStorage(newUserData) //update data in localStorage
                break;
        
            default:
                break;
        }

    }



    return{

        //useStates
        editAccount: editAccount,
        editContact: editContact,
        editDelivery: editDelivery,
        setEditAccountFlag,
        setEditContactFlag,
        setEditDeliveryFlag,

        //userContext
        isLogged,
        setUserAccountData,
        setUserCachedData,

        //useForm
        register,
        reset,
        getValues,

        //other functions
        formGroupsEnum,
        formValues,
        edit,
        close,
        save,
        saveCredentials,

    }
}

