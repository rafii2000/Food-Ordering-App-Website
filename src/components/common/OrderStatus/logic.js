
import { useEffect, useState, useCallback, useRef } from "react"
import { useHistory } from 'react-router-dom'
import axios from "axios"


export function useOrderStatus() {
    
        
    const history = useHistory()
    const [historyState, setHistoryState] = useState(history.location.state) //waiting || accepted || canceled
    const [orderStatus, setOrderStatus] = useState('waiting') //waiting || accepted || canceled
    const orderID = useRef()


    const checkOrderStatus = useCallback(
        async () => {
            
            const response = await axios.get(`/api/order/${orderID.current}/status`).catch(err => {console.log(err.data)}) //TODO: handle error
            
            if(response.data.data.status === 'waiting'){
                setTimeout(checkOrderStatus, 5000)
            }
            else{
                setOrderStatus(response.data.data.status)
            }
        },
        [],
    )


    const sendNewOrder = useCallback(
        async () => {

            if(!historyState) return
            if(orderStatus !== 'waiting') return
            if(orderID.current) return
               
            const data = {
                userData: historyState.userData,
                userOrder: historyState.userOrder,
            }

            //history.replace({ state: undefined })
            //window.history.replaceState(undefined, '')

            const response = await axios.post('/api/new-order', data).catch(err => {console.log(err.data)}) //TODO: handle error
            
            
            if(response.data.status === 'success'){
                orderID.current = response.data.data.orderID
                checkOrderStatus()
            }
            else{
                //TODO: handle status === error
            }

            
        },
        [checkOrderStatus, orderStatus, historyState],
    )
    
    useEffect(() => {

        //call once at the beginning
        console.log('useOrderStatus useEffect')
        if(!history.location.state && !orderID.current){
            console.log(history.location)
            console.log(orderID.current)
            history.push('/')
        }

        history.replace({ state: undefined })
        sendNewOrder()

        //cleanup
        return () => {
            console.log('canceled order: ', orderID.current)
        }
    }, [sendNewOrder, history])

    
    return {
        orderStatus: orderStatus,
    }

}
