import React from 'react'
import { useContext} from 'react'

//context
import RestaurantMenuContext from '../../../contexts/restaurant_menu'

//component
import DishTypeCard from '../DishTypeCard'

import './style.css'

export default function DishesTypesList() {

    const {dishesTypes} = useContext(RestaurantMenuContext)

    return (
        <div className='dishes_types_list'>
            
            {dishesTypes.map((dishType, id) =>
            
                <DishTypeCard
                    key={id}
                    dishType={dishType.type}
                    dishTypeLabel={dishType.typeName}
                />
            )}
        </div>
    )
}
