import React from 'react'

import { useDishTypeCard } from './logic'
import { useQueryString } from '../../../hooks/useQueryString'

import {ReactComponent as RightArrowIcon} from '../../../assets/icons/dishes_types/svg/arrow.svg'

import './style.css'

export default function DishTypeCard({dishType, dishTypeLabel}) {
    
    const {activeDishType} = useDishTypeCard()
    const {updateQueryString} = useQueryString()
   
    return (
        <div className={activeDishType === dishType ? 'dish_type_card--active' : 'dish_type_card'}
            onClick={() => updateQueryString('dishType', dishType)}
        >
            <div className='dish_type_card__image'>
                <img src={process.env.PUBLIC_URL+`assets/icons/dishes_types/svg/${dishType}.svg`} alt=''></img>
            </div>

            <div className='dish_type_card__name'>
                {dishTypeLabel}
            </div>

            <div className='dish_type_card__button'>
                <RightArrowIcon/>
            </div>
        </div>
    )
}
