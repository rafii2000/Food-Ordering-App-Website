import React from 'react'
import { useState, useEffect, useContext, useRef} from 'react'
import { Link } from 'react-router-dom'

import FavButton from '../Buttons/FavButton'

import UserOrderContext  from '../../../contexts/user_order'

import './style.css'

export default function DishMenuCard({dishDTO, type}) {
    
    const [dishSize, setDishSize] = useState('S')
    const [imgLoading, setImgLoading] = useState(true)
    const {increaseDishesNumber} = useContext(UserOrderContext)
    const cardRef = useRef()

    
    useEffect(() => {
        setDishSize('S')
    }, [dishDTO])


    return (
        <div className='dish_menu_card' ref={cardRef}>
            <span>
                <div className='dish_menu_card__image' style={imgLoading === true ? {animation: 'gradient 1.5s linear infinite'} : {animation: 'none'} }>
                    
                    {<FavButton version={true} dishDTO={dishDTO} />}
                    
                    <img src={process.env.PUBLIC_URL+`assets/dishes_photos/${dishDTO.dishType}/${dishDTO.dishID}/photo.png`} alt=''
                        onLoad={() => setImgLoading(false)}
                        style={imgLoading === true ? {opacity: '0'} : {opacity: '1'}}
                    ></img>
                </div>

                <div className='dish_menu_card__details'>

                    <div className='dish_menu_card__details__row'>
                        <div className='dish_menu_card__name'>{dishDTO.name}</div>
                        <div className='dish_menu_card__price'>{dishDTO.price[dishSize].toFixed(2)}$</div>
                    </div>

                    <div className='dish_menu_card__details__row'>
                        <div className='dish_menu_card__category'>{dishDTO.dishSubtypeName}</div>
                        <div></div>
                    </div>

                    <div className='dish_menu_card__details__row'>
                        <div className='dish_menu_card__ingredients'>
                            {dishDTO.ingredients.join(', ')}
                        </div>
                        <div></div>
                    </div>
                </div>
            </span>

            <span>
            
                <div className='dish_menu_card__buttons'>
                    <div className='dish_menu_card__dish_sizes'>

                        {dishDTO.sizes.map((size, id) =>
                            <div className={dishSize === size ? 'dish_menu_card__size_button--active' : 'dish_menu_card__size_button' }
                                key={id}    
                                onClick={() => setDishSize(size)}
                            >
                                {size}
                            </div>
                        )}
                        
                    </div>
                                        
                    {/* Mobile Layout */}
                    {window['device'] === 'mobile' &&
                        <Link to={`/order?dishType=${dishDTO.dishType}&dishID=${dishDTO.dishID}&size=${dishSize}`}>
                            <div className='dish_menu_card__order_button'>Order</div>
                        </Link>
                    }
                    
                    {/* Desktop Layout */}
                    {window['device'] === 'desktop' &&
                        <div className='dish_menu_card__order_button'
                            onClick={() => {increaseDishesNumber(dishDTO, dishSize)}}
                        >
                            Order
                        </div>
                    }

                </div>

            </span>

        </div>
    )
}
