
import { useEffect, useState, useCallback, useRef } from "react"
import { useHistory } from 'react-router-dom'
import axios from "axios"


export function useOrderStatus() {
    
        
    const history = useHistory()
    const [orderStatus, setOrderStatus] = useState() // waiting || accepted || canceled
    const orderID = useRef()
    const intervalID = useRef()
    const orderStatusRef = useRef()
    

    const checkOrderStatus = useCallback(
        async () => {
            
            const response = await axios.get(`/api/orders/${orderID.current}/status`).catch(err => {console.log(err.data)}) //TODO: handle error
            
            if(response.data.data.status !== 'waiting'){

                history.replace({ state: {orderDetails:undefined, isOrderSent:true, orderID: orderID.current, orderStatus: response.data.data.status} })

                orderStatusRef.current = response.data.data.status
                clearInterval(intervalID.current)
                setOrderStatus(response.data.data.status)
            }

        },
        [history],
    )


    const sendNewOrder = useCallback(
        async () => {
               
            const data = {
                userData: history.location.state.orderDetails.userData,
                userOrder: history.location.state.orderDetails.userOrder,
            }
            
            const response = await axios.post('/api/new-order', data).catch(err => {
                setOrderStatus('error')
                console.log(err.data)
            })
            
            
            if(response.data.status === 'success'){
                orderID.current = response.data.data.orderID
                intervalID.current = setInterval(checkOrderStatus, 5000)
                orderStatusRef.current = 'waiting'
                setOrderStatus('waiting')

                history.replace({ state: {orderDetails:undefined, isOrderSent:true, orderID: response.data.data.orderID, orderStatus: 'waiting'} })
            }
            else{
                setOrderStatus('error')
            }

            
        },
        [checkOrderStatus, history],
    )
    
    if(!history.location.state){
        history.push('/')
    }

    useEffect(() => {

        const cleanup = () => {
            console.log('cleanup()')
            if(orderStatusRef.current === 'waiting'){
                if(orderID.current){
                    axios.put(`/api/orders/${orderID.current}/canceled`)
                    history.push('/')
                }
            }

            clearInterval(intervalID.current)
        }

        //call once at the beginning
        console.log('useOrderStatus useEffect')

        if(!history.location.state){
            history.push('/')
        }
       
        //send order just once
        else if(history.location.state.orderDetails && history.location.state.isOrderSent === false){
            sendNewOrder()
        }

        //if user refresh page in waiting state, canceled order
        else if(history.location.state.isOrderSent === true && history.location.state.orderID){
            
            if(history.location.state.orderStatus === 'waiting'){
                axios.put(`/api/orders/${history.location.state.orderID}/canceled`)
            }
        
            history.push('/')
        }

                

        //if user accidentally leave the page, canceled order
        window.addEventListener('beforeunload', cleanup);
        

        //cleanup
        return () => {
            console.log('useEffect cleanup')
            console.log(history.location.state)
            clearInterval(intervalID.current)
            window.removeEventListener('beforeunload', cleanup);
            
            //if user click 'back' in waiting state, canceled order
            if(orderStatusRef.current === 'waiting'){
                if(orderID.current){
                    axios.put(`/api/orders/${orderID.current}/canceled`)
                    history.push('/')
                }
            }
        }

    }, [sendNewOrder, history])

    
    return {
        orderStatus: orderStatus,
    }

}
