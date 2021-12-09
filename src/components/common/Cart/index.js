import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from './logic'


import RectButton from '../Buttons/BigRectButton'


import { HiArrowNarrowRight} from 'react-icons/hi'
import {GrClose} from 'react-icons/gr'

import './style.css'


export default function Cart({paymentButton = true}) {

    console.log("Cart rerender")

    const {
        couponDivRef, couponCode, discount, totalOrderPrice, totalOrderSize,
        printCartCards, cancelCouponCode, checkCouponCode
    } = useCart()

    return (
        <div className='cart'>
            
            <div className='cart__cards_list'>
                {printCartCards()}
            </div>

            {totalOrderSize > 0 &&
            <>
                <div className='cart__coupon_code' isCouponValid={couponCode.code ? 1 : 0} ref={couponDivRef}>
                    <input placeholder={couponCode.code ? '' : 'ex: discountcode2021'} ></input>
                    <button style={{display: 'none'}} onClick={() => cancelCouponCode()}><GrClose/></button> 
                    <div className="loader" style={{display: 'none'}}></div>
                </div>
            
                <RectButton btnStyle={'primary'} onClick={() => checkCouponCode()}>
                    Apply Coupons <HiArrowNarrowRight style={{fontSize: '20px', marginLeft: '15px'}}/>
                </RectButton>
            </>  
            }

            <div className='cart__order_summary'>   

                <div className='cart__order_summary__row'>
                    <div className='cart__order_summary__label'>Item Total</div>
                    <div className='cart__order_summary__price'>${totalOrderPrice.toFixed(2)}</div>
                </div>

                <div className='cart__order_summary__row'>
                    <div className='cart__order_summary__label'>Delivery Charge</div>

                    <div className='cart__order_summary__price'>$2.25</div>
                </div>

                <div className='cart__order_summary__row'>
                    <div className='cart__order_summary__label'>Coupon Discount</div>
                    <div className='cart__order_summary__price'>{discount !== 0 ? `-$${(-1*discount).toFixed(2)}` : '$0.00'}</div>
                </div>

                <div className='cart__order_summary__row'>
                    <div className='cart__order_summary__label'>Tax</div>
                    <div className='cart__order_summary__price'>$0.25</div>
                </div>

                <div className='cart__order_summary__total_row'>
                    <div className='cart__order_summary__total_label'>Total:</div>
                    <div className='cart__order_summary__total_price'>${(totalOrderPrice + 2.25 + 0.25 + discount).toFixed(2)}</div>
                </div>

            </div>
            
            
            {paymentButton && totalOrderSize > 0 &&
                <Link to='/order-summary'>
                    <RectButton btnStyle={'accent'} onClick={() => {}}>
                        Proceed to payment method
                    </RectButton>
                </Link>
            }

        </div>
    )
}
