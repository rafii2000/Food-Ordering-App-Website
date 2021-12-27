
import { useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import axios from "axios"
import * as uuid from 'uuid';


export function useOrderStatus() {
    
    const history = useHistory()
    const orderID = uuid.v4()
    const [orderStatus, setOrderStatus] = useState('waiting') //waiting || accepted || canceled

    if(!history.location.state){
        history.push('/')
    }

    console.log('location.state:', history.location.state)
    

    const sendNewOrder = () => {

        axios.post('/new-order')
        .then(res => {})
        .catch(err => {console.log(err.data)}) //TODO: handle error
    }

    const checkOrderStatus = () => {
        axios.get(`/accepted-orders/${orderID}`)
        .then(res => {
            
            setOrderStatus(res.data.data)

        })
        .catch(err => {console.log(err.data)}) //TODO: handle error
    }


    //const orderStatusInterval = setInterval(checkOrderStatus, 5000)



    useEffect(() => {
               
        //cleanup
        return () => {
            
        }
    }, [])

    
    return {
        orderStatus: orderStatus,
    }

}
