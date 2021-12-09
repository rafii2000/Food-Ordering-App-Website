import React, { useState } from "react"
import { useCallback } from "react"

const RestaurantMenuContext = React.createContext(true)

export default RestaurantMenuContext


export function RestaurantMenuContextProvider ({children}){
        
    console.log('RestaurantMenuContext')
    
    //with fetch data on init and data props
    // const dishesTypes = useMemo(() => data ? data.dishesTypes : null, [data])
    // const restaurantMenu = useMemo(() => data ? data.restaurantMenu : null, [data])
    // const restaurantDishes = useMemo(() => data ? data.restaurantDishes : null, [data])

    const [dishesTypes, setDishesTypes] = useState(null)            //essential data
    const [restaurantMenu, setRestaurantMenu] = useState(null)      //essential data
    const [restaurantDishes, setRestaurantDishes] = useState(null)  //helpers data
    
    
    const getDishDTO = useCallback(
        (dishType, dishID) => {
            
            if(!restaurantMenu[dishType]) return null

            for(let dish of restaurantMenu[dishType]){
                if(dish.dishID === dishID){
                    return dish
                }
            }
        },
        [restaurantMenu],
    )


    //create helpers context
    if(restaurantMenu && restaurantDishes === null){

        let dishesList = []

        for(let array of Object.values(restaurantMenu)){
            dishesList = dishesList.concat(array)
        }

        setRestaurantDishes(dishesList)
    }
    

    return(
        <RestaurantMenuContext.Provider value={{
            dishesTypes,
            restaurantMenu,
            restaurantDishes,
            setDishesTypes,
            setRestaurantMenu,
            setRestaurantDishes,

            getDishDTO,
        }}>
            {children}
        </RestaurantMenuContext.Provider>
    )
}



