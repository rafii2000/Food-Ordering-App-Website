
import { useCallback, useContext, useRef } from 'react'

//context
import RestaurantMenuContext from '../../../contexts/restaurant_menu'
import SearchContext from '../../../contexts/search_bar'
import UserContext from '../../../contexts/user'


import { useQueryString } from '../../../hooks/useQueryString'


export default function useDishesGridList(type) {
    
    
    const {getQueryStringParamValue} = useQueryString()
    const {restaurantMenu, restaurantDishes} = useContext(RestaurantMenuContext)
    const {
        isLogged, userAccountFavDishes, userAccountFavDishesList,
        userCachedFavDishes, userCachedFavDishesList
    } = useContext(UserContext)
    const {searchPhrase} = useContext(SearchContext)
    const currentDishType = getQueryStringParamValue('dishType')
    let message = useRef('')


    const dishesFilter = useCallback(
        (dishDTO) => {

            if( dishDTO.name.toLowerCase().includes(searchPhrase.toLowerCase()) ||
                dishDTO.dishSubtypeName.toLowerCase().includes(searchPhrase.toLowerCase()) ||
                dishDTO.ingredients.join(',').toLowerCase().includes(searchPhrase.toLowerCase())
            ){
                return dishDTO
            }
            
        },
        [searchPhrase],
    )

    const filterMenuDishes = useCallback(
        () => {

            // home page            
            if(!restaurantMenu) return {}

            if(restaurantMenu && !currentDishType)
                return restaurantDishes.filter(dishesFilter)
                

            if(restaurantMenu && currentDishType)
                return restaurantMenu[currentDishType].filter(dishesFilter)
                        
        },
        [restaurantMenu, restaurantDishes, currentDishType, dishesFilter],
    )

    const filterFavDishes = useCallback(
        () => {

            // favorites page
            let categorisedDishes = {}
            let dishesList = {}

            if(isLogged === true){
                //get data from "database" userContext
                categorisedDishes = userAccountFavDishes
                dishesList = userAccountFavDishesList
            }   
            else{
                //get data from LocalStorage
                categorisedDishes = userCachedFavDishes //getUserFavDishesFromLocalStorage()
                dishesList = userCachedFavDishesList    //getUserFavDishesListFromLocalStorage()
            }


            if(!categorisedDishes) return {}
            

            if(categorisedDishes && !currentDishType){
                if(dishesList.length === 0)
                    message.current = `Your fav list is empty`

                return dishesList
            }
                
            
            if(categorisedDishes && currentDishType){
                if(categorisedDishes[currentDishType].length === 0)
                    message.current = `Your fav ${currentDishType} list is empty`
                    
                return categorisedDishes[currentDishType] 
            }
                           
                
        },
        [isLogged, currentDishType, userAccountFavDishes, userAccountFavDishesList],
    )


    return {
        filteredDishes: type === 'fav_dishes' ? filterFavDishes() : filterMenuDishes(),
        message: message.current,
    }

}


