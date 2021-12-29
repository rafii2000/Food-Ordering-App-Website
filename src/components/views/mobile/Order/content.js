import React from 'react'
import { useContext } from 'react'

import LinkWithPrefUrl from '../../../hoc/Link'

import { useOrder } from './logic'
import UserOrderContext from '../../../../contexts/user_order'
import DishSizeButton from '../../../common/Buttons/DishSizeButton'
import {ReactComponent as CartIcon} from '../../../../assets/icons/buttons/svg/cart.svg'

import './style.css'

export default function Content() {

    const {dishDTO, dishType, dishID, addDish, removeDish, activeSize, setActiveSize} = useOrder()
    const {userOrder} = useContext(UserOrderContext)
    
    return (
        
        dishDTO &&

        <div className='order_subpage__content '>
            
            <div className='order_subpage__description'>
                <h1>{dishDTO.name}</h1>
                <p>{dishDTO.description}</p>
            </div>

            <div className='order_subpage__dish_image'>
                <div className='order_subpage__dish_image__background'>
                    <img src={process.env.PUBLIC_URL+`assets/dishes_photos/${dishType}/${dishDTO.dishID}/photo.png`} alt=''></img>
                </div>
            </div>

            <div className='order_subpage__buttons_panel'>

                <div className='order_subpage__buttons_panel__dish_sizes'>
                    {dishDTO.sizes.map((size, id) => 
                        <DishSizeButton
                            key={id}
                            dishSize={size}
                            active={activeSize === size ? true : false}
                            setActiveDishSizeButton={setActiveSize}
                        />
                    )}
                </div>

                <div className='order_subpage__buttons_panel__dishes_counter'>
                        <div className='btn__circle  btn__circle--small  btn__circle--light_accent' onClick={() => {removeDish()}}>-</div>
                        <div className='dishes_counter__label'>
                            {userOrder[dishID] ? userOrder[dishID]['amount'][activeSize] : 0}
                        </div>
                        <div className='btn__circle  btn__circle--small  btn__circle--light_accent' onClick={() => {addDish()}}>+</div>
                </div>
            
            </div>

            <div className='order_subpage__order_summary'>
                <div className='order_subpage__order_price'>
                    <div className='order_subpage__order_price__label'>Price</div>
                    <div className='order_subpage__order_price__number'>
                        {userOrder[dishID] ? userOrder[dishID].price.toFixed(2) : 0}$
                    </div>
                </div>
                <LinkWithPrefUrl pathname='/cart'>
                    <div className='order_subpage__go_to_cart_button'>
                        <CartIcon/> Go to cart
                    </div>
                </LinkWithPrefUrl>
            </div>

        </div>

        
    )
}
