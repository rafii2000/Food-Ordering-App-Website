import { useContext, useCallback, useMemo, useState, useEffect  } from "react"
import { useHistory } from "react-router"

import { useQueryString } from '../../../../hooks/useQueryString'

import RestaurantMenuContext from "../../../../contexts/restaurant_menu"
import UserOrderContext from "../../../../contexts/user_order"

//Business logic. Pure testable, atomic functions



//Implementation/framework logic. Encapsulating state amd effects here
export const useOrder = () => {

    const {queryStringParams} = useQueryString()
    const {getDishDTO} = useContext(RestaurantMenuContext)
    const {userOrder, increaseDishesNumber, decreaseDishesNumber} = useContext(UserOrderContext)

    const history = useHistory()
    const [activeSize, setActiveSize] = useState('M')
    const [dishCounter, setDishCounter] = useState(0)
   
    // HELPERS VARIABLES
    const dishType = useMemo(() => queryStringParams['dishType'], [queryStringParams])
    const dishID = useMemo(() => queryStringParams['dishID'], [queryStringParams])
    const dishDTO = useMemo(() => getDishDTO(dishType, dishID), [dishType, dishID, getDishDTO])

    // SIMPLE VALIDATION
    if(queryStringParams['dishType'] === undefined || queryStringParams['dishID'] === undefined){
        history.push('/')
    }

   
    const highlightDishSize = useCallback(
        () => {
            
            if(!userOrder[dishID]) return

            for(let key in userOrder[dishID]['amount']){
                if (userOrder[dishID]['amount'][key] !== 0){
                    setActiveSize(key)
                    return
                }
        }
        },
        [userOrder, dishID],
    )

    

    const addDish = useCallback(
        () => {
            
            const currentCounter = increaseDishesNumber(dishDTO, activeSize)
            setDishCounter(activeSize+currentCounter) //wymuszaj ponowne renderowanie
            //dlatego tak, bo  gdy np: S=1 i z M=0 => M=1, M jest ciagle zero bo useStete jest ciegle 1
        },
        [dishDTO, activeSize, increaseDishesNumber],
    )

    const removeDish = useCallback(
        () => {
            const currentCounter = decreaseDishesNumber(dishDTO, activeSize)
            setDishCounter(activeSize+currentCounter) //wymuszaj ponowne renderowanie
        },
        [activeSize, dishDTO, decreaseDishesNumber],
    )


    useEffect(() => {
        highlightDishSize()
    }, [highlightDishSize])
    
    return {
        dishID,
        dishType,
        dishDTO,

        activeSize,
        setActiveSize,
        dishCounter,

        addDish,
        removeDish,
        highlightDishSize,

    }
    
}