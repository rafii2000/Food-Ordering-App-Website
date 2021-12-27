
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
    const [updateResult, setUpdateResult] = useState({status: '', message: ''})


    const {isLogged, userID, userAccountData, userCachedData, setUserAccountData, setUserCachedData} = useContext(UserContext)

    const formValues = () => {
        
        if(isLogged)
            return {

                credentials: {
                    userID:             (userAccountData && userAccountData.userID)          ||  null,
                    email:              (userAccountData && userAccountData.email)           ||  null,
                    password:           null,
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
                    email:              (userCachedData && userCachedData.email)            ||  null,
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
                .then(res => {
                    //show modal message on success
                    //console.log(res.data)
                    setUpdateResult({status: res.data.status, message: res.data.message, id: Math.random()})
                })
                .catch(err => {
                    //show modal message on error
                    //console.log(err)
                    setUpdateResult({status: err.data.status, message: err.data.message, id: Math.random()})
                })

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
                        .then(res => {
                            //show message on success
                            //console.log(res.data)
                            setUpdateResult({status: res.data.status, message: res.data.message, id: Math.random()})
                        })
                        .catch(err => {
                            //show message on error
                            //console.log(err)
                            setUpdateResult({status: err.data.status, message: err.data.message, id: Math.random()})
                        })     
                    }
                    else{
                        setUpdateResult({status: 'error', message: 'Passwords are different', id: Math.random()})
                        reset(formValues())
                    }
                }

                //update email in database
                if(userAccountData.email !== newCredentials.email){
                                        
                    axios.put(`/api/users/${userID}/email`, {email: newCredentials.email})
                        .then(res => setUpdateResult({status: res.data.status, message: res.data.message, id: Math.random()})) 
                        .catch(err => setUpdateResult({status: err.data.status, message: err.data.message, id: Math.random()}))     
                }

                //update email in userContext
                newUserData.email = newCredentials.email
                const deepCopy = JSON.parse(JSON.stringify(newUserData))
                setUserAccountData(deepCopy) //order is important, setUserAccountData(newUserData) operation, must be after if statement

                break;

            case false:

                newUserData.email = newCredentials.email
                const deepCopy2 = JSON.parse(JSON.stringify(newUserData))
                setUserCachedData(deepCopy2) //update data in userContext
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
        updateResult: updateResult,
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

