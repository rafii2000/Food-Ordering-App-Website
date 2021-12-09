import React from 'react'
import { useState, useEffect, useCallback, useContext} from 'react'
import {ReactComponent as HeartIcon} from '../../../../assets/icons/buttons/svg/heart.svg'
import {ReactComponent as WhiteHeartIcon} from '../../../../assets/icons/buttons/svg/heart-white.svg'
import UserContext from '../../../../contexts/user'
import { useLocalStorage } from '../../../../hooks/useLocalStorage'


// import '../style.css'

export default function FavButton({version, dishDTO}) {
    
    const [favorite, setFavorite] = useState(false)
    const {
        isLogged, 
        userAccountFavDishesIDsList, userCachedFavDishesIDsList,
        addFavDishToUserAccount, removeFavDishFromUserAccount,
        updateCachedFavDishesStates
    } = useContext(UserContext)
    const {addFavDishToLocalStorage, removeFavDishFromLocalStorage} = useLocalStorage()

    
    const fillHeartIcon = useCallback(
        () => {

            if(isLogged === true){
                if(userAccountFavDishesIDsList && userAccountFavDishesIDsList.includes(dishDTO.dishID))
                    setFavorite(true)
                else
                    setFavorite(false)
            }
            else{
                if(userCachedFavDishesIDsList && userCachedFavDishesIDsList.includes(dishDTO.dishID))
                    setFavorite(true)
                else
                    setFavorite(false)
            }
            
        },
        [dishDTO, isLogged, userAccountFavDishesIDsList, userCachedFavDishesIDsList],
    )
    
    

    const onClick = () => {

        switch (isLogged){

            case true:
                if(!favorite === true){
                    addFavDishToUserAccount(dishDTO.dishID)   //User Context
                }
                if(!favorite === false){
                    removeFavDishFromUserAccount(dishDTO.dishID)  //User Context
                }
                break;

            case false:
                if(!favorite === true){
                    addFavDishToLocalStorage(dishDTO)       //save favDishes in LocalStorage
                    updateCachedFavDishesStates(dishDTO)    //update favDishes in userContext
                }
                if(!favorite === false){
                    removeFavDishFromLocalStorage(dishDTO)  //save favDishes in LocalStorage
                    updateCachedFavDishesStates(dishDTO)    //update favDishes in userContext
                }
                break;

            default:
                break;
        }

        setFavorite(!favorite)
    }


    useEffect(() => {
        fillHeartIcon()
    }, [fillHeartIcon])


    return (
        <>
            {version ? 
                <div className='btn__square  btn__square--small' style={{backgroundColor: '#FFFFFF00'}} onClick={() => onClick()}>
                    <WhiteHeartIcon style={favorite === true ? {fill: '#FFF', opacity: '90%'} : {opacity: '60%'}}/>
                </div>
            :
                <div className='btn__square  btn__square--small  btn__square--shadow' onClick={() => onClick()}>
                    <HeartIcon style={favorite === true ? {fill: 'var(--accent_color)'} : null}/>
                </div>
            }
        </>
       
    )

}
