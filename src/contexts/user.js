import React from 'react'
import { useState, useCallback } from 'react';

import axios from 'axios';

import { useLocalStorage } from '../hooks/useLocalStorage'; 

const UserContext = React.createContext()
export default UserContext;



export function UserContextProvider({children}) {
    
    console.log('UserContextProvider')

        
    const {
        getUserDataFromLocalStorage,
        getUserFavDishesFromLocalStorage,
        getUserFavDishesListFromLocalStorage,
        getUserFavDishesIDsListFromLocalStorage
    } = useLocalStorage()
    
    //helpers states:
    const [isLogged, setIsLogged] = useState(false)
    const [userID, setUserID] = useState(false)
    const [userDataModel, setUserDataModel] = useState(null)
    const [userInputtedData, setUserInputtedData] = useState(null)  //order summary form

    //loggedIn User states:
    const [userAccountData, setUserAccountData] = useState(null)  

    const [userAccountFavDishes, setUserAccountFavDishes] = useState(null)
    const [userAccountFavDishesList, setUserAccountFavDishesList] = useState(null)
    const [userAccountFavDishesIDsList, setUserAccountFavDishesIDsList] = useState(null)
    //userFavDishesGroupedObject || userFavDishesGrouped || userFavDishesObject



    //not logged User states
    const [userCachedData, setUserCachedData] = useState( getUserDataFromLocalStorage() )

    const [userCachedFavDishes, setUserCachedFavDishes] = useState( getUserFavDishesFromLocalStorage() )
    const [userCachedFavDishesList, setUserCachedFavDishesList] = useState( getUserFavDishesListFromLocalStorage() )
    const [userCachedFavDishesIDsList, setUserCachedFavDishesIDsList] = useState( getUserFavDishesIDsListFromLocalStorage() )
    
    
    

    const clearUserContext = useCallback(
        () => {
                    
            //clearUserContext === logout
            setIsLogged(false)
            setUserAccountData(null)
            setUserAccountFavDishes(null)
            setUserAccountFavDishesList(null)
            setUserAccountFavDishesIDsList(null)
        },
        [],
    )


    
    const updateAccountFavDishesStates = useCallback(
        
        (favDishesObject) => {

            console.log('updateAccountFavDishesStates: ', favDishesObject)
            
            //create favDishesList helper state
            let favDishesList = []
            for(let array of Object.values(favDishesObject)){
                favDishesList = favDishesList.concat(array)
            }

            //create favDishesIDsList helper state
            let favDishesIDsList = []
            for(let dish of favDishesList){
                favDishesIDsList.push(dish.dishID)
            }


            //removes FillHeartIcon
            setUserAccountFavDishesIDsList(favDishesIDsList)

            //removes DishCard from DishesGridList
            setUserAccountFavDishes(favDishesObject)
            setUserAccountFavDishesList(favDishesList) 

        },
        []

    )
    
    const updateCachedFavDishesStates = useCallback(
        () => {

            //get data from LocalStorage
            const favDishes = getUserFavDishesFromLocalStorage()
            const favDishesList = getUserFavDishesListFromLocalStorage()
            const favDishesIDsList = getUserFavDishesIDsListFromLocalStorage()

            //update cachedFavDishes states
            setUserCachedFavDishes(favDishes)
            setUserCachedFavDishesList(favDishesList)
            setUserCachedFavDishesIDsList(favDishesIDsList)
            
        },
        [getUserFavDishesFromLocalStorage, getUserFavDishesListFromLocalStorage, getUserFavDishesIDsListFromLocalStorage]
    )

    //TODO: move to favButton logic ???
    const addFavDishToUserAccount = useCallback(
        async (dishID) => {

            //console.log(`addFavDishToUserAccount, userID: ${userAccountData.userID}, dishID: ${dishDTO.dishID}`)
            const response = await axios.put(`/api/fav-dishes/${userID}/${dishID}`).catch(err => console.log(err))
            
            if(response.data.status === 'success'){
                //updatedFavDishesObject
                const updatedFavDishes = await axios.get(`/api/fav-dishes/${userID}`)
                updateAccountFavDishesStates(updatedFavDishes.data.data)
            }
            else{
                //TODO: handle error while adding fav dish -> modal message
            }
            
        },
        [userID, updateAccountFavDishesStates],
    )
    
    //TODO: move to favButton logic ???
    const removeFavDishFromUserAccount = useCallback(
        async (dishID) => {

            //console.log(`removeFavDishFromUserAccount, userID: ${userAccountData.userID}, dishID: ${dishDTO.dishID}`)
            const response = await axios.delete(`/api/fav-dishes/${userID}/${dishID}`).catch(err => console.log(err))
            
            if(response.data.status === 'success'){
                //updatedFavDishesObject
                const updatedFavDishes = await axios.get(`/api/fav-dishes/${userID}`)
                updateAccountFavDishesStates(updatedFavDishes.data.data)
            }
            else{
                //TODO: handle error while removing fav dish -> modal message
            }
            
        },
        [userID, updateAccountFavDishesStates],
    )

        
    
    
    return (
        <UserContext.Provider value={{
            isLogged,
            setIsLogged,

            userID,
            setUserID,

            userDataModel,
            setUserDataModel,
            
            userAccountData,
            setUserAccountData,

            userCachedData,
            setUserCachedData,

            userInputtedData,
            setUserInputtedData,
            
            userAccountFavDishesList,
            userAccountFavDishesIDsList,
            userAccountFavDishes,
            updateAccountFavDishesStates,
            
            userCachedFavDishes,
            userCachedFavDishesList, 
            userCachedFavDishesIDsList,
            updateCachedFavDishesStates,
            
            addFavDishToUserAccount,
            removeFavDishFromUserAccount,

            clearUserContext,
            
        }}>
            {children}
        </UserContext.Provider>
    )
}










// //TODO: implement useReducer instead of multiple useSates

//     //userContextReducerActions
//     const userContextRA = {
//         SET_IS_LOGGED: 'setIsLogged',
//         SET_USER_DATA_MODEL: 'setUserDataModel',
//         SET_ACCOUNT_DATA: 'setUserAccountData',
//         SET_CACHED_DATA: 'setUserCachedData',
//         SET_USER_INPUTTED_DATA: 'setUserInputtedData',

//         SET_FAV_DISHES_CATEGORIES: 'setUserAccountFavDishes',
//         SET_FAV_DISHES_LIST: 'setUserAccountFavDishesList',
//         SET_FAV_DISHES_IDs_LIST: 'setUserAccountFavDishesIDsList',
//     }

//     const reducerInitState = {

//         isLogged: false,
//         userDataModel: {},
//         userAccountData: {},
//         userCachedData: {}, //getUserDataFromLocalStorage()
//         userInputtedData: {},
        
//         userAccountFavDishes: {},
//         userAccountFavDishesList: [],
//         userAccountFavDishesIDsList: [],
//     }

//     const reducer = (state, action) => {
        
//         //action = { type: 'increment2', value: 10 }

//         let tempState = state
//         const uCRA = userContextRA

        
//         switch (action.type) {
//             //----------------------- USER MAIN DATA -------------------------------------------
//             case uCRA.SET_IS_LOGGED:
//                 tempState = { ...tempState, isLogged: action.value };
//                 break;

//             case uCRA.SET_USER_DATA_MODEL:
//                 tempState = { ...tempState, userDataModel: action.value };
//                 break;

//             case uCRA.SET_ACCOUNT_DATA:
//                 tempState = { ...tempState, userAccountData: action.value };
//                 break;
            
//             case uCRA.SET_CACHED_DATA:
//                 tempState = { ...tempState, userCachedData: action.value };
//                 break;
            
//             case uCRA.SET_USER_INPUTTED_DATA:
//                 tempState = { ...tempState, userInputtedData: action.value };
//                 break;

//             //------------------------ USER FAV DISHES -------------------------------------------
//             case uCRA.SET_FAV_DISHES_CATEGORIES:
//                 tempState = { ...tempState, userAccountFavDishes: action.value };
//                 break;

//             case uCRA.SET_FAV_DISHES_LIST:
//                 tempState = { ...tempState, userAccountFavDishesList: action.value };
//                 break;
            
//             case uCRA.SET_FAV_DISHES_IDs_LIST:
//                 tempState = { ...tempState, userAccountFavDishesIDsList: action.value };
//                 break;
        
//             default:
//                 break;
//         }

//         return tempState
//     } 

//     const [state, dispatch] = useReducer(reducer, reducerInitState)







