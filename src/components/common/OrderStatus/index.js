import React from 'react'

import { Link } from 'react-router-dom'

import {useOrderStatus} from './logic'

import {IoIosHourglass} from 'react-icons/io'
import {MdOutlineErrorOutline} from 'react-icons/md'
import {IoFastFoodOutline} from 'react-icons/io5'

import './style.css'

const Spinner = () => {
    const loaderStyles = () => {

        return {
            width: '50px',
            height: '50px',
            marginTop: '50px'
        }

    }

    return (
        <div className='loader' style={loaderStyles()}></div>
    )
}

export default function OrderStatus() {

    const {orderStatus} = useOrderStatus()
    
    return (
        <div className='order-status'>
            
            {orderStatus === 'error' ?
                <>
                    <MdOutlineErrorOutline/>
                    <h2>An error occurred while sending the order</h2>
                    <p>We are sorry for inconvenience. Please come back later.</p>
                    <Link to='/'>Home</Link>
                </>
            :
            orderStatus === 'accepted' ?
                <>  
                    <div className='order-status--answer'>
                        <div>
                            <h2 order_status={orderStatus}>ACCEPTED</h2>
                        </div>

                        <div>
                            <IoFastFoodOutline order_status={orderStatus}/>
                        </div>
                        
                        <p>Your order has been accepted to processing
                            <br></br> We will deliver it as soon as possible
                        </p>
                        
                    </div>

                    <Link to='/'>Home</Link>

                </>
            :
            orderStatus === 'rejected' ?
                <>  
                    <div className='order-status--answer'>
                        <div>
                            <h2 order_status={orderStatus}>REJECTED</h2>
                        </div>

                        <div>
                            <IoFastFoodOutline order_status={orderStatus}/>
                        </div>
                        
                        <p>Your order has been rejected because we have already reached maximum number of orders.
                            <br></br> We are sorry for inconvenience
                        </p>
                    </div>

                    <Link to='/'>Home</Link>
                </>
                :
                <>
                    <IoIosHourglass/>
                    <h2>Wait for restaurant to accept your order</h2>
                    <p>Please, do not close yor browser. Do not leave this page, do not click back and do not refresh page.</p>
                    <Spinner/>
                </> 
            
            }
            
        </div>
    )
}
