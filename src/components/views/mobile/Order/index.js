import React from 'react'

import { useOrder } from './logic'

import Subpage from '../../../layouts-templates/mobile/Subpage'
import TopBar from '../../../layouts-templates/TopBar'
import ReturnButton from '../../../common/Buttons/ReturnButton'
import FavButton from '../../../common/Buttons/FavButton'
import Content from './content'




export default function Order() {

    const {dishDTO} = useOrder()

    return (
        <div className='order_subpage'>
            
            <Subpage>

                <TopBar
                    left={<ReturnButton/>}
                    right={<FavButton dishDTO={dishDTO}/>}
                />

                <Content></Content>
                
            </Subpage>
           
        </div>
    )
}




