import React from 'react'
import { useCallback, useState } from 'react'

const UserOrderContext = React.createContext()

export default UserOrderContext

const userOrder = {}    //dla kazdego wywolania providera zachowuje ten sam stan obiektu w przypadku gdy nie tworzymy jednego głownego providera, tylko dla
                        //komponent który potrzebuje danych o uzytkowniku wkladamy go w UserOrderContextProvider
let coupon = ''

export function UserOrderContextProvider({children}) {
  
    const [orderState, triggerRenderOnOrderUpdate] = useState(true)
   
    const updateOrderPrice = useCallback(
        (amountObj, dishDTO) => {
            
            let price = 0

            for(let size in amountObj){
                price += amountObj[size] * dishDTO.price[size]
            }
            
            return price
        },
        [],
    )

    const increaseDishesNumber = useCallback(
        (dishDTO, size) => {
            
            let dishID = dishDTO.dishID
            let dishType = dishDTO.dishType

            if(!userOrder[dishID]){

                //add new order to list
                let newOrder = {
                    dishType: dishType,
                    amount: {S:0, M:0, L:0},
                    dishDTO: dishDTO,
                    price: 0
                }
                
                userOrder[dishID] = newOrder
            }
            
            //update order
            userOrder[dishID]['amount'][size] += 1

            //update order price
            userOrder[dishID]['price'] = updateOrderPrice(userOrder[dishID]['amount'], dishDTO)

            //trigger rerender components which use this context
            triggerRenderOnOrderUpdate(!orderState)

        },
        [ updateOrderPrice, orderState],
    )

    const decreaseDishesNumber = useCallback(
        (dishDTO, size) => {
            
            let dishID = dishDTO.dishID
            
            if(!userOrder[dishID]) return

            //decrease dish order number for a specific size
            userOrder[dishID]['amount'][size] -= 1
                            
            //check total number of orders for a specific dish (different sizes)
            let ordersAmountArray = Object.values(userOrder[dishID]['amount'])
            let ordersAmount = ordersAmountArray.reduce((a, b) => {return a + b}, 0)
            
            if(ordersAmount <= 0){
                //delete specific dish from userOrder
                delete userOrder[dishID]
            }
            else{
                //update order price
                userOrder[dishID]['price'] = updateOrderPrice(userOrder[dishID]['amount'], dishDTO)
            }

            //trigger rerender components which use this context
            triggerRenderOnOrderUpdate(!orderState)

        },
        [ updateOrderPrice, orderState],
    )

    const deleteSpecificDishSize = useCallback(
        (dishID, size) => {
            
            if(!userOrder[dishID]) return

            //delete specific dish size from order
            userOrder[dishID]['amount'][size] = 0

            //check total number of orders for a specific dish (different sizes)
            let ordersAmountArray = Object.values(userOrder[dishID]['amount'])
            let ordersAmount = ordersAmountArray.reduce((a, b) => {return a + b}, 0)

            if(ordersAmount <= 0){
                //delete specific dish from userOrder
                delete userOrder[dishID]
            }
            else{
                //update order price
                userOrder[dishID]['price'] = updateOrderPrice(userOrder[dishID]['amount'], userOrder[dishID].dishDTO)
            }

            //trigger rerender components which use this context
            triggerRenderOnOrderUpdate(!orderState)
        },
        [ updateOrderPrice, orderState],
    )

    const getOrderSize = useCallback(
        () => {
            let orderSize = 0
            
            for(let key in userOrder){
                
                let orderAmount = Object.values(userOrder[key]['amount'])
                for(let amount of orderAmount){
                    orderSize += amount
                }
            }
            
            return orderSize
        },
        [],
    )

    const setCoupon = useCallback(
        (enteredCoupon) => {
            coupon = enteredCoupon
        },
        [],
    )

    const getCoupon = useCallback(
        () => {
            return coupon
        },
        [],
    )


         
    return (
        <UserOrderContext.Provider value={{
            userOrder: userOrder,
            orderSize: getOrderSize(),
            increaseDishesNumber,
            decreaseDishesNumber,
            deleteSpecificDishSize,
            setCoupon,
            getCoupon,
        }}>
            {children}
        </UserOrderContext.Provider>
    )
}
