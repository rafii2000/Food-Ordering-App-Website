import { useMemo } from "react"

export const useLocalStorage = () => {

    const localStorageKeys = ['favDishesCategories', 'favDishesList', 'favDishesListIDs']
       
    const storageEnum = useMemo(() => {return {
        USER_CACHED_DATA: 'userCachedData',
        FAV_DISHES_LIST: 'favDishesList',
        FAV_DISHES_IDs_LIST: 'favDishesListIDs',
        FAV_DISHES_CATEGORIES: 'favDishesCategories',
    }}, [])




    //user-data functions
    const getUserDataFromLocalStorage = () => {
        return JSON.parse(localStorage.getItem(storageEnum.USER_CACHED_DATA))
    }

    const updateUserDataInLocalStorage = (newUserData) => {
        localStorage.setItem(storageEnum.USER_CACHED_DATA, JSON.stringify(newUserData))
    }




    //fav-dishes functions
    const addFavDishToLocalStorage = (dishDTO) => {

        //don't add duplicates
        if(JSON.parse(localStorage.getItem(storageEnum.FAV_DISHES_IDs_LIST)).includes(dishDTO.dishID)) return

        //update LocalStorage
        for(let storageKey of localStorageKeys){
                
            let tempObj = JSON.parse(localStorage.getItem(storageKey))
            //console.log(tempObj)

            switch(storageKey){

                case 'favDishesList':
                    tempObj.push(dishDTO)
                    localStorage.setItem(storageKey, JSON.stringify(tempObj))
                    break;

                case 'favDishesListIDs':
                    tempObj.push(dishDTO.dishID)    
                    localStorage.setItem(storageKey, JSON.stringify(tempObj))
                    break;
            
                case 'favDishesCategories':
                    
                    if(tempObj[dishDTO.dishType]){
                        tempObj[dishDTO.dishType].push(dishDTO) 
                    }
                    else{
                        tempObj[dishDTO.dishType] = []
                        tempObj[dishDTO.dishType].push(dishDTO) 
                    }
                       
                    localStorage.setItem(storageKey, JSON.stringify(tempObj))
                    break;

                default:
                    break;
            }
            
        }
        
    }

    const removeFavDishFromLocalStorage = (dishDTO) => {

        //update LocalStorage
        for(let storageKey of localStorageKeys){
                
            let tempObj = JSON.parse(localStorage.getItem(storageKey))
            
            switch(storageKey){

                case 'favDishesList':

                    for(let num in tempObj){
                        if(tempObj[num].dishID === dishDTO.dishID){
                            tempObj.splice(num, 1)
                            break
                        }
                    }

                    localStorage.setItem(storageKey, JSON.stringify(tempObj))      
                    break;


                case 'favDishesListIDs':    

                    for(let num in tempObj){
                        if(tempObj[num] === dishDTO.dishID){
                            tempObj.splice(num, 1)
                            break
                        }
                    }

                    localStorage.setItem(storageKey, JSON.stringify(tempObj))      
                    break;
            
                case 'favDishesCategories':
                                       
                    for(let num in tempObj[dishDTO.dishType]){
                        
                        if(tempObj[dishDTO.dishType][num].dishID === dishDTO.dishID){
                            tempObj[dishDTO.dishType].splice(num, 1)
                            break
                        }
                    }

                    localStorage.setItem(storageKey, JSON.stringify(tempObj))               
                    break;

                default:
                    break;
            }
            
        }
    }

    const getUserFavDishesFromLocalStorage = () => {
        return JSON.parse(localStorage.getItem(storageEnum.FAV_DISHES_CATEGORIES))
    }

    const getUserFavDishesListFromLocalStorage = () => {
        return JSON.parse(localStorage.getItem(storageEnum.FAV_DISHES_LIST))
    }

    const getUserFavDishesIDsListFromLocalStorage = () => {
        return JSON.parse(localStorage.getItem(storageEnum.FAV_DISHES_IDs_LIST))
    }


    return{
        storageEnum,

        getUserDataFromLocalStorage,
        updateUserDataInLocalStorage,

        addFavDishToLocalStorage,
        removeFavDishFromLocalStorage,
        getUserFavDishesFromLocalStorage,
        getUserFavDishesListFromLocalStorage,
        getUserFavDishesIDsListFromLocalStorage
    }

}