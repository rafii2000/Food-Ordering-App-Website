import React from 'react'
import { useContext } from 'react'

import UserOrderContext from '../../../../contexts/user_order'

import {ReactComponent as MinusIcon} from '../../../../assets/icons/buttons/svg/minus.svg'
import {ReactComponent as PlusIcon} from '../../../../assets/icons/buttons/svg/plus.svg'
import {ReactComponent as DeleteIcon} from '../../../../assets/icons/buttons/svg/x.svg'

import './style.css'

export default function CartCard({size, amount, dishDTO}) {
    
    const {increaseDishesNumber, decreaseDishesNumber, deleteSpecificDishSize} = useContext(UserOrderContext)
    
    return (
        <div className='cart_card'>

            <div className='cart_card__image'>
                <img src={process.env.PUBLIC_URL+`assets/dishes_photos/${dishDTO.dishType}/${dishDTO.dishID}/photo.png`} alt=''></img>
            </div>

            <div className='cart_card__order_summary'>
                <div className='cart_card__order_summary__row'>
                    <div className='cart_card__dish_name'>{dishDTO.name}</div>
                    <div className='cart_card__delete_order'>
                        <DeleteIcon onClick={() => {deleteSpecificDishSize(dishDTO.dishID, size); }}/>
                    </div>
                </div>

                <div className='cart_card__order_summary__row'>
                    <div className='cart_card__dish_size'>Size: {size}</div>
                    <div></div>
                </div>

                <div className='cart_card__order_summary__row'>
                    <div className='cart_card__order_summary__dish_counter'>
                        <MinusIcon onClick={() => {decreaseDishesNumber(dishDTO, size); }}/>
                        <div className='cart_card__dish_counter__label'>{amount}</div>
                        <PlusIcon onClick={() => {increaseDishesNumber(dishDTO, size); }}/>
                    </div>
                    <div className='cart_card__order_summary__price'>
                        {(dishDTO.price[size] * amount).toFixed(2)}$
                    </div>
                </div>
            </div>
        </div>
    )
}
