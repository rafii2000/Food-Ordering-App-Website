import React from 'react'
import { useState, useEffect, useContext, useCallback } from 'react'
import axios from 'axios'

import RestaurantMenuContext from '../../../contexts/restaurant_menu'
import UserContext from '../../../contexts/user'

import { useLocalStorage } from '../../../hooks/useLocalStorage'

import MobileView from '../../views/mobile/MobileView'
import DesktopView from '../../views/desktop/DesktopView'
import ServiceUnavailable503 from '../HttpErrors/ServiceUnavailable503'

import './style.css'


const Spinner = () => {
    const loaderStyles = () => {

        return {
            width: '50px',
            height: '50px'
        }

    }

    return (
        <div className='fetching_data'>
            <section>
                <div className='loader' style={loaderStyles()}></div>
                <p>Website is loading</p>
            </section>
        </div>
    )
}


export default function AppLoader() {

    console.log('AppLoader')
    const [device, setDevice] = useState()
    const [essentialData, setEssentialData] = useState(false)
    const [serviceUnavailable, setServiceUnavailable] = useState(false)

    const {setDishesTypes, setRestaurantMenu} = useContext(RestaurantMenuContext)
    const {setIsLogged, setUserID, setUserAccountData, updateAccountFavDishesStates} = useContext(UserContext)
    const {storageEnum} = useLocalStorage()
  

    const changeAppLayout = () => {
        
        if(!device){
            //set event listener on first call
            window.onresize = changeAppLayout
        }
    
        if(window.innerWidth <= 850 && device !== 'mobile'){
            window['device'] = 'mobile'
            setDevice('mobile')
        }
        
        if(window.innerWidth > 850 && device !== 'desktop'){
            window['device'] = 'desktop'
            setDevice('desktop')
        }
    }

    const createFavDishesObjectsInLocalStorage = useCallback(
        (dishesTypes) => {
            
            if(!dishesTypes) return
            
            //create object templates
            let favDishesCategories = {}
            let favDishesList = []
            let favDishesListIDs = []
            
            for(let item of dishesTypes){
                favDishesCategories[item.type] = []
            }

            if(!localStorage.getItem(storageEnum.FAV_DISHES_CATEGORIES))
                localStorage.setItem(storageEnum.FAV_DISHES_CATEGORIES, JSON.stringify(favDishesCategories))

            if(!localStorage.getItem(storageEnum.FAV_DISHES_LIST))
                localStorage.setItem(storageEnum.FAV_DISHES_LIST, JSON.stringify(favDishesList))

            if(!localStorage.getItem(storageEnum.FAV_DISHES_IDs_LIST))
                localStorage.setItem(storageEnum.FAV_DISHES_IDs_LIST, JSON.stringify(favDishesListIDs))

        },
        [storageEnum],
    )

    const createUserDataObjectInLocalStorage = useCallback(
        (dataModel) => {
            
            if(!localStorage.getItem(storageEnum.USER_CACHED_DATA))
                localStorage.setItem(storageEnum.USER_CACHED_DATA, JSON.stringify(dataModel))

        },
        [storageEnum],
    )
    

    //functions to call on App init:
    changeAppLayout()
    
    
    //run only once on App init (set data in all Contexts)
    useEffect( () => {
        
        const initApp = async () => {
            
            //wait for all api request
            const essentialData = await axios.all([
                axios.get('/api/dishes-types'),     
                axios.get('/api/menu'),             
                axios.get('/api/user/data-model'),
            ]).catch(err => console.log(err))

            if(!essentialData){
                setServiceUnavailable(true)
                return
            }
            
            //if essentialData exists then extract data from response
            const dishesTypes = essentialData[0].data.data
            const restaurantMenu = essentialData[1].data.data
            const userDataModel = essentialData[2].data.data
            //console.log(dishesTypes, restaurantMenu, userDataModel)

            //call init functions 
            createFavDishesObjectsInLocalStorage(dishesTypes)
            createUserDataObjectInLocalStorage(userDataModel)

            //set essential data in Contexts
            setDishesTypes(dishesTypes)
            setRestaurantMenu(restaurantMenu)
            

            //check does user session expire (AutoLogin)
            const userData = await axios.get('/api/user/check-session').catch(err => console.log(err))

            if(userData && userData.data.status === 'success'){

                //extract data from userData
                const userAccountData = userData.data.data.userData
                const userAccountFavDishes = userData.data.data.userFavDishes
                //console.log(userAccountData, userAccountFavDishes)

                setIsLogged(true)
                setUserID(userAccountData.userID)
                setUserAccountData(userAccountData)
                updateAccountFavDishesStates(userAccountFavDishes) //TODO: wrap in useCallback
            }

        
            //finally close loading animation and run App
            setEssentialData(true)

        }

        initApp()

    },[setDishesTypes, setRestaurantMenu, createFavDishesObjectsInLocalStorage, createUserDataObjectInLocalStorage, setIsLogged, setUserID, setUserAccountData, updateAccountFavDishesStates]
    )

    return (
        <>
            {!serviceUnavailable && !essentialData && <Spinner/> }
            {serviceUnavailable && <ServiceUnavailable503/> }


            {essentialData && device === 'mobile' && <MobileView/> }
            {essentialData && device === 'desktop' && <DesktopView/>}

        </>
    )

}



