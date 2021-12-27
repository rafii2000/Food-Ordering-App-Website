
import { useEffect, useState, useCallback, useContext, useRef } from 'react'
import axios from 'axios'

import UserOrderContext from '../../../contexts/user_order'

import CartCard from './CartCard'

let couponCode = {code: '', isValid: undefined}
let couponDiscount = 0

export const useCart = () => {
    
    const {userOrder, setCoupon} = useContext(UserOrderContext)

    const [render, setRender] = useState(true)
    const [discount, setDiscount] = useState(couponDiscount)
    const couponDivRef = useRef()
        
    const printCartCards = useCallback(
        () => {
            if(Object.keys(userOrder).length > 0){
                return (
                    
                    //dla kazdego zamowienia w obiekcie userOrder
                    Object.keys(userOrder).map((key, id1) =>
                        
                        // dla kazdego rozmiaru dania wiekszego niz 0 
                        Object.keys(userOrder[key]['amount']).map((size, id2) =>
                        
                        userOrder[key]['amount'][size] > 0 &&
                            <CartCard 
                                key = {id1+id2}
                                size = {size}
                                amount = {userOrder[key]['amount'][size]}
                                dishDTO = {userOrder[key]['dishDTO']}
                            />
                        )
                ))
            }
            else{
                return(
                    <div className='cart_subpage__empty_cart'>
                        <h1>Cart is empty</h1>
                        <h4>Go back to menu and add products to the order</h4>
                    </div>
                )
            }
        },
        [userOrder],
    )

    const totalOrderSize = useCallback(
        () => {
            let totalSize = 0
            
            for(let key in userOrder){
                
                let orderAmount = Object.values(userOrder[key]['amount'])
                for(let amount of orderAmount){
                    totalSize += amount
                }
            }
            
            return totalSize
        },
        [userOrder],
    )

    const totalOrderPrice = useCallback(
        () => {
            let totalPrice = 0
                        
            if(Object.keys(userOrder).length === 0) return 0

            for(let key in userOrder){
                totalPrice += userOrder[key].price
            }

            return totalPrice
        },
        [userOrder],
    )

    const cancelCouponCode = useCallback(
        () => {

            //clear input value
            couponDivRef.current.children[0].value = ''
            //hide cancel button
            couponDivRef.current.children[1].style['display'] = 'none'
            //reset input border
            couponDivRef.current.attributes.isCouponValid.value = 0

            couponCode.code = ''
            couponCode.isValid = undefined

            //reset discount and rerender cart
            setDiscount(0)
            setCoupon("")
            setRender(!render)
            
        },
        [render, setCoupon],
    )


    const checkCouponCode = useCallback(
        () => {

            //wrapper children order:
            //0: input
            //1: button
            //2: loader

            let enteredCode = couponDivRef.current.children[0].value
            
            const validCouponCodes = [
                'coupon10$', 'coupon20$', 'coupon30$', 'coupon40$',
                'coupon50$', 'coupon60$', 'coupon70$', 'coupon80$',
                'coupon90$', 'coupon100$'
            ]

            //show loading animation on Apply Coupon click
            couponDivRef.current.children[2].style['display'] = 'block'

            //hide cancel coupon button on Apply Coupon click
            couponDivRef.current.children[1].style['display'] = 'none'

            //mock API request 
            setTimeout( () => {

                if(!couponDivRef.current) return

                if(validCouponCodes.includes(enteredCode)){
                    setDiscount(validCouponCodes.indexOf(enteredCode) * -10 - 10)
                    couponDivRef.current.attributes.isCouponValid.value = 1
                    couponCode.code = enteredCode
                    couponCode.isValid = true
                    setCoupon(enteredCode)
                }
                else{
                    couponDivRef.current.attributes.isCouponValid.value = -1
                    couponCode.code = enteredCode
                    couponCode.isValid = false
                    setDiscount(0)
                }

                //hide loading animation on API response
                couponDivRef.current.children[2].style['display'] = 'none'

                //show cancel coupon button on API response
                couponDivRef.current.children[1].style['display'] = 'block'
                
            }, 2000)
        },
        [setCoupon],
    )


        
    const sendOrderToAPI = useCallback(
        () => {
            console.log('sendOrderToAPI')

            console.log(userOrder)

            //clear userOrder after placing the order
            for(let key in userOrder){
                delete userOrder[key]
            }

            // Same Origin Policy Error | CORS
            axios.get('https://order-pizza-api.herokuapp.com/api/orders', {
                withCredentials: true,    
                headers:{
                        
                        // 'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': 'true',

                    }
            })
            .then((res) => {console.log(res.data)})
            .catch((err) => {})
        },
        [userOrder]
    )



   
    useEffect(() => {
        
        if(couponDivRef.current){

            if(couponCode.code){
                couponDivRef.current.children[0].value = couponCode.code    //set coupon value
            }       
            
            //highlight coupon input
            if(couponCode.isValid === true){
                couponDivRef.current.attributes.isCouponValid.value = 1     //green
                couponDivRef.current.children[1].style['display'] = 'block' //show cancel coupon button
            }
            else if(couponCode.isValid === false){
                couponDivRef.current.attributes.isCouponValid.value = -1    //red
                couponDivRef.current.children[1].style['display'] = 'block' //show cancel coupon button
            }
            else{
                couponDivRef.current.attributes.isCouponValid.value = 0     //transparent
                couponDivRef.current.children[1].style['display'] = 'none'  //hide cancel coupon button
            }

        }
        
    }, [])
       

    return {
        couponDivRef,
        totalOrderPrice: totalOrderPrice(),
        totalOrderSize: totalOrderSize(),
        discount: discount,
        couponCode: couponCode,
        printCartCards,
        checkCouponCode,
        cancelCouponCode,
        sendOrderToAPI,
    }

}