import axios from 'axios'
import { useEffect, useState, useCallback, useRef } from 'react'

export default function useRestaurantPanel() {
    
    const intervalID = useRef()
    const [orders, setOrders] = useState([])    


    const getOrders = useCallback(
        async () => {
            
            const response = await axios.get('/api/orders').catch(err => {})

            if(response.data.status === 'success'){
                //console.log(response.data.data[0])

                if(JSON.stringify(orders) === JSON.stringify(response.data.data))
                    console.log('brak nowych zamowien')
                else
                    setOrders(response.data.data)
            }
            else{
                //TODO: handle error
            }

        },
        [orders],
    )

    const acceptOrder = (orderID) =>{
        axios.put(`/api/orders/${orderID}/accepted`)
    }

    const rejectOrder = (orderID) =>{
        axios.put(`/api/orders/${orderID}/rejected`)
    }

    const formatDate = (datetime) => {
        console.log('formatDate')
        const [date, time] = datetime.slice(0, -5).split('T')
        return `${date} ${time}`    
    }

    const getDishesFromOrder = (order) => {
        console.log('getDishesFromOrder')
       
        const dishes = []
    
        Object.entries(order.userOrder).map(([key, subOrder]) => 
            dishes.push(subOrder)
        )

        return dishes
    }


    const getDishAmountAndSizes = (dish) => {

        const dishSizes = []

        Object.entries(dish.amount).map(([dishSize, amount]) => 
            amount > 0 ? dishSizes.push([dishSize, amount]) : 0
        )

        return dishSizes
    }


    useEffect(() => {
        console.log('useEffect')
        const cleanup = () => {
            clearInterval(intervalID.current)
        }

        intervalID.current = setInterval(getOrders, 1000)

        window.addEventListener('beforeunload', cleanup)

        return () => {
            clearInterval(intervalID.current)
            window.removeEventListener('beforeunload', cleanup)
        }
    }, [getOrders])

    return {
        orders: orders,
        acceptOrder,
        rejectOrder,
        formatDate,
        getDishesFromOrder,
        getDishAmountAndSizes,
    }

}

