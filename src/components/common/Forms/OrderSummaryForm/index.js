import React from 'react'
import { useContext, useState, useEffect } from "react";
import { useForm } from 'react-hook-form';


import UserContext from '../../../../contexts/user';
import UserOrderContext from "../../../../contexts/user_order";


import NamedSection from "../../../layouts-templates/NamedSection";
import FormAutoFill from '../../FormAutoFill';
import ReturnButton from "../../Buttons/ReturnButton";
import RectButton from '../../Buttons/BigRectButton';
import Cart from "../../Cart";


import {IoWalletSharp} from 'react-icons/io5'
import {FaPaypal} from 'react-icons/fa';
import {ImCreditCard} from 'react-icons/im'


import './style.css'


export default function OrderSummary() {

    console.log('OrderSummary rerender')

    const {userOrder, orderSize, getCoupon} = useContext(UserOrderContext)
    const {userAccountData, userCachedData, userInputtedData, setUserInputtedData} = useContext(UserContext)
    
    const [paymentMethod, setPaymentMethod] = useState(userInputtedData ? userInputtedData.paymentMethod : null)

    const {register, handleSubmit, reset, setValue, getValues} = useForm({
        defaultValues: userInputtedData ? userInputtedData : null
    })

    const submitPaymentForm = (data) => {

        console.log("Payment-Form Data: ", data)
        console.log("User-Order Data: ", userOrder)
        console.log("Discount-Coupon: ", getCoupon())

    }

    const autoFillFromCache = () => {
        
        reset({
            email:              userCachedData ? userCachedData.email           : null,
            password:           userCachedData ? userCachedData.password        : null,
            repeatPassword:     null,

            firstName:          userCachedData ? userCachedData.firstName       : null,
            lastName:           userCachedData ? userCachedData.lastName        : null,
            phoneNumber:        userCachedData ? userCachedData.phoneNumber     : null,

            city:               userCachedData ? userCachedData.city            : null,
            street:             userCachedData ? userCachedData.street          : null,
            streetNumber:       userCachedData ? userCachedData.streetNumber    : null,
            apartmentNumber:    userCachedData ? userCachedData.apartmentNumber : null,
            floor:              userCachedData ? userCachedData.floor           : null,
        })
    }

    const autoFillFromAccount = () => {

        reset({
            email:              userAccountData ? userAccountData.email           : null,
            password:           userAccountData ? userAccountData.password        : null,
            repeatPassword:     null,

            firstName:          userAccountData ? userAccountData.firstName       : null,
            lastName:           userAccountData ? userAccountData.lastName        : null,
            phoneNumber:        userAccountData ? userAccountData.phoneNumber     : null,

            city:               userAccountData ? userAccountData.city            : null,
            street:             userAccountData ? userAccountData.street          : null,
            streetNumber:       userAccountData ? userAccountData.streetNumber    : null,
            apartmentNumber:    userAccountData ? userAccountData.apartmentNumber : null,
            floor:              userAccountData ? userAccountData.floor           : null,
        })
    }


   
   
    useEffect(() => {
        
        if(window.device === 'mobile'){

            window.scrollTo({
                top: '0px',
                left: '0px',
                behavior: 'smooth'
           })
        }

        return () => {
            //Save user inputs on component unmount
            setUserInputtedData(getValues())
        }

    }, [getValues, setUserInputtedData])


    return (
        <div className='order_summary_form'>
            
            <form onSubmit={handleSubmit(submitPaymentForm)}>

                <div className='form__left_column'>
                
                    <nav>
                        <ReturnButton/>
                        <h2>Order Summary</h2>
                        <span></span>
                    </nav>

                    <main>

                        <NamedSection name='Contact details' mb={'35px'}>
                            <div className='order_summary_form__inputs_group'>
                                <span>
                                    <label>First name</label>
                                    <input {...register('firstName', {required: true})}></input>
                                </span>

                                <span>
                                    <label>Last name</label>
                                    <input {...register('lastName', {required: true})}></input>
                                </span>

                                <span>
                                    <label>Phone</label>
                                    <input {...register('phoneNumber', {required: true})}></input>
                                </span>

                                <span>
                                    <label>E-mail</label>
                                    <input {...register('email', {required: true})}></input>
                                </span>
                            </div>
                        </NamedSection>

                        <NamedSection name='Delivery address' mb={'35px'}>
                            <div className='order_summary_form__inputs_group'>
                                <span>
                                    <label>City</label>
                                    <input {...register('city', {required: true})}></input>
                                </span>

                                <span>
                                    <label>Street</label>
                                    <input {...register('street', {required: true})}></input>
                                </span>

                                <span>
                                    <label>Street number</label>
                                    <input {...register('streetNumber', {required: true})}></input>
                                </span>

                                <span>
                                    <label>Apartment number</label>
                                    <input {...register('apartmentNumber', {required: true})}></input>
                                </span>
                            </div>
                        </NamedSection>

                        <FormAutoFill
                            autoFillFromCache={autoFillFromCache}
                            autoFillFromAccount={autoFillFromAccount}
                        ></FormAutoFill>
    
                        <NamedSection name='Comments to order' mb={'35px'} mt={'35px'}>
                            <div className='comments_to_order'>
                                <textarea {...register('commentToOrder')}></textarea>
                            </div>               
                        </NamedSection>

                        <NamedSection name='Payments methods' mb={'35px'}>
                            <div className='payment_methods' >

                                <div style={{width: '100%', height: '0px', overflow: 'hidden'}}>
                                    <input type='' {...register('paymentMethod', {required: true})}></input>
                                </div>
                                
                                <button type='button' is_active={paymentMethod === 'blik' ? 'true' : 'false'}
                                    onClick={() => {setValue('paymentMethod', 'blik'); setPaymentMethod('blik') }}
                                >
                                    <img src='https://www.czerwona-skarbonka.pl/wp-content/uploads/2020/11/blik-1024x768.png' width='100px' height='auto' alt=''/>
                                </button>

                                <button type='button' is_active={paymentMethod === 'card' ? 'true' : 'false'}
                                    onClick={() => {setValue('paymentMethod', 'card'); setPaymentMethod('card') }}
                                >
                                    <ImCreditCard/> Card
                                </button>

                                <button type='button' is_active={paymentMethod === 'paypal' ? 'true' : 'false'}
                                    onClick={() => {setValue('paymentMethod', 'paypal'); setPaymentMethod('paypal') }}
                                >
                                    <FaPaypal/> PapPal
                                </button>

                                <button type='button' is_active={paymentMethod === 'cash' ? 'true' : 'false'}
                                    onClick={() => {setValue('paymentMethod', 'cash'); setPaymentMethod('cash') }}
                                >
                                    <IoWalletSharp/> Cash
                                </button>

                            </div>
                        </NamedSection>

                        {window.device === 'desktop' && orderSize > 0 &&
                            <NamedSection name='Total order price'>

                                <RectButton btnStyle={'accent'} btnType={'submit'}>
                                    Order and pay
                                </RectButton>
                            
                            </NamedSection>
                        }
                                                
                    </main>

                </div>


                <div className='form__right_column'>
                    <Cart paymentButton={false}/>
                    
                    {window.device === 'mobile' && orderSize > 0 &&
                        <RectButton btnStyle={'accent'} btnType={'submit'}>
                            Order and pay
                        </RectButton>
                    }
                </div>

            </form>
            
        </div>
    )
}
