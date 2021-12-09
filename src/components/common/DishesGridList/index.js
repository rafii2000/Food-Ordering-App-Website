import React from 'react'

import useDishesGridList from './logic'

import DishCard from '../DishCard'

import './style.css'

export default function DishesGridList({type}) {
    
    console.log('DishesGirdList rerender')

    const {filteredDishes, message} = useDishesGridList(type)
        
    return (
        <div className='dishes_menu_list'>
            
            <div className='dishes_menu_list__search_message'>
                {filteredDishes.length === 0 && !type &&
                    <>
                        <p>No matching dishes found</p>
                        <p>Try our others delicious recipes</p>
                    </>
                }

                {filteredDishes.length === 0 && type === 'fav_dishes' &&
                    <>
                        <p>{message}</p>
                        <p>Go Back to menu and choose your dishes </p>
                    </>
                }
            </div>

            <div className='dishes_menu_list__grid'>
                {filteredDishes.length > 0 &&
                    filteredDishes.map((dishDTO, id) => 

                        <DishCard   
                            key={id}
                            dishDTO={dishDTO}
                            type={type}
                        />
                    )
                }
            </div>
 
        </div>
    )
}
