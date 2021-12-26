import React from 'react'
import { useEffect, useState } from 'react/cjs/react.development'

import {MdClose} from 'react-icons/md'
import './style.css'

export default function ModalMessage({status, message, id}) {
    
    const [className, setClassName] = useState()
    const timeout = 4000 //time in milliseconds

    const device = window.device

    const closeModal = () =>{
        setClassName('fade-out')           
    }
    
    
    useEffect(() => {
        
        if(status && message){
            setClassName('fade-in')   
            setTimeout(() => {setClassName('fade-out')}, timeout)
        }
                    
    }, [status, message, id])

    return (

        <div className={`modal-message modal-message--${status} modal-message--${device}  modal-message--${className}`}>
            <MdClose onClick={() => closeModal()}/>
            <p>{message}</p>
            <span></span>
        </div>
    )

}

