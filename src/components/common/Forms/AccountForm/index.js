import React from 'react'

import { useAccountForm } from './logic';

import LogOutButton from '../../Buttons/LogOutButton'
import UserNotLoggedPrompt from '../../UserNotLoggedPrompt';
import ModalMessage from '../../ModalMessage';

import './style.css'



export default function AccountForm() {

    console.log('AccountForm rerender')

    const {
        isLogged, //userContext
        register, //useForm
        formGroupsEnum, edit, close, save, saveCredentials, //hook functions
        editAccount, editContact, editDelivery, updateResult //hook states
    } = useAccountForm()
        
    return (
       
        <div className='account_form'>

            <ModalMessage
                status={updateResult.status}
                message={updateResult.message}
                id={updateResult.id}
            />

            <form>

                {isLogged === false ? <UserNotLoggedPrompt/> : <LogOutButton version='form-account'/>} 

                <div className='form_group'>
                    <div className='form_group__title'>Account</div>

                    <div className='form_group__fields'>
                        <label>Email</label>
                        <input  {...register('credentials.email')} disabled={editAccount}></input>
                        
                        {isLogged && 
                        <>  
                            <label style={{marginTop: '35px'}}>New Password</label>
                            <input  type='password' {...register('credentials.password')} disabled={editAccount}></input>

                            <label>Repeat Password</label>
                            <input type='password' {...register('credentials.repeatPassword')} disabled={editAccount}></input>
                        </>
                        }
                    </div>

                    <div className='form_group__buttons'>
                        
                        {editAccount === !false ?

                            <button type='button' onClick={() => {edit(formGroupsEnum.ACCOUNT)} }>
                                Edit
                            </button>
                        :
                            <>
                                <button type='button' onClick={() => {close(formGroupsEnum.ACCOUNT)} }>
                                    Close
                                </button>

                                <button type='button' onClick={() => {saveCredentials(formGroupsEnum.ACCOUNT)} }>
                                    Save
                                </button>
                            </>
                        }

                    </div>
                </div>


                <div className='form_group'>
                    <div className='form_group__title'>Contact details</div>

                    <div className='form_group__fields'>
                        <label>First Name</label>
                        <input {...register('userData.firstName')} disabled={editContact}></input>

                        <label>Last Name</label>
                        <input {...register('userData.lastName')} disabled={editContact}></input>

                        <label>Phone number</label>
                        <input {...register('userData.phoneNumber')} disabled={editContact}></input>
                    </div>

                    <div className='form_group__buttons'>
                        
                        {editContact === !false ?

                            <button type='button' onClick={() => {edit(formGroupsEnum.CONTACT)} }>
                                Edit
                            </button>
                        :
                            <>
                                <button type='button' onClick={() => {close(formGroupsEnum.CONTACT)} }>
                                    Close
                                </button>

                                <button type='button' onClick={() => {save(formGroupsEnum.CONTACT)} }>
                                    Save
                                </button>
                            </>
                        }

                    </div>
                </div>


                <div className='form_group'>
                    <div className='form_group__title'>Delivery address</div>

                    <div className='form_group__fields'>
                        <label>City</label>
                        <input {...register('userData.city')} disabled={editDelivery}></input>

                        <label>Street</label>
                        <input {...register('userData.street')} disabled={editDelivery}></input>

                        <label>Street number</label>
                        <input {...register('userData.streetNumber')} disabled={editDelivery}></input>

                        <label>Apartment number</label>
                        <input {...register('userData.apartmentNumber')} disabled={editDelivery}></input>

                        <label>Flor</label>
                        <input {...register('userData.floor')} disabled={editDelivery}></input>
                    </div>

                    <div className='form_group__buttons'>
                        
                        {editDelivery === !false ?

                            <button type='button' onClick={() => {edit(formGroupsEnum.DELIVERY)} }>
                                Edit
                            </button>
                        :
                            <>
                                <button type='button' onClick={() => {close(formGroupsEnum.DELIVERY)} }>
                                    Close
                                </button>

                                <button type='button' onClick={() => {save(formGroupsEnum.DELIVERY)} }>
                                    Save
                                </button>
                            </>
                        }

                    </div>
                </div>

            </form>

        </div>

        
    )
}





