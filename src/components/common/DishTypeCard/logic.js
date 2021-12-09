
import { useCallback,  } from "react"
import { useHistory } from "react-router-dom"



//Business logic. Pure testable, atomic functions






//Implementation/framework logic. Encapsulating state amd effects here

export const useDishTypeCard = () => {

    const history = useHistory()
   
    const getActiveDishType = useCallback(
        () => {
                       
            const search = history.location.search;
            const params = new URLSearchParams(search);
            const activeDishType = params.get('dishType')
           
            return activeDishType

        },
        [history],
    )

    return {activeDishType: getActiveDishType()}
}



