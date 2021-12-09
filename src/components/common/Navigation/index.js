import React from 'react'
import { useState, useContext } from 'react';
import { useLocation } from 'react-router';
import LinkWithPrefUrl from '../../hoc/Link';

import UserOrderContext from '../../../contexts/user_order';

//hooks
import useDesktopPage from '../../layouts-templates/desktop/DesktopPage/logic';


//import icons
import {ReactComponent as HomeIcon} from '../../../assets/icons/navigation/svg/home.svg';
import {ReactComponent as FavoritesIcon} from '../../../assets/icons/navigation/svg/favorites.svg';
import {ReactComponent as AccountIcon} from '../../../assets/icons/navigation/svg/account.svg';
import {ReactComponent as CartIcon} from '../../../assets/icons/navigation/svg/cart.svg'

import './style.css'


export default function Navigation() {

    const location = useLocation()
    const {toggleSideBar} = useDesktopPage()
    const {orderSize} = useContext(UserOrderContext)
    const [activeButton, setActiveButton] = useState(location.pathname)

    console.log('Navigation rerender')
    if(activeButton !== location.pathname){
        setActiveButton(location.pathname)
    }
    

    return (
        
        <div className='navigation'>

            <LinkWithPrefUrl pathname='/home' search='?dishType=burgers'>
                <div className={activeButton === '/home' ? 'navigation__button--active' : 'navigation__button'}>
                    <div className='navigation__button__icon'>
                        <HomeIcon className='no_stroke'/>
                    </div>
                    <div className='navigation__button__label'>Home</div>
                </div>
            </LinkWithPrefUrl>
            

            <LinkWithPrefUrl pathname='/favorites'>
                <div className={activeButton === '/favorites' ? 'navigation__button--active' : 'navigation__button'}>
                    <div className='navigation__button__icon'>
                        <FavoritesIcon className='no_fill'/>
                    </div>
                    <div className='navigation__button__label'>Favorites</div>
                </div>
            </LinkWithPrefUrl>
            

            <LinkWithPrefUrl pathname='/account'>
                <div className={activeButton === '/account' ? 'navigation__button--active' : 'navigation__button'}>
                    <div className='navigation__button__icon'>
                        <AccountIcon className='no_stroke'/>
                    </div>
                    <div className='navigation__button__label'>Account</div>
                </div>
            </LinkWithPrefUrl>
            


            {window.device === 'mobile' &&
                
                <LinkWithPrefUrl pathname='/cart'>
                    <div className={activeButton === '/cart' ? 'navigation__button--active' : 'navigation__button'}>
                        <div className='navigation__button__icon'>
                            <CartIcon className='no_fill'/>
                            {orderSize > 0 &&
                                <span className='cartOrderSize' style={activeButton === '/cart' ? {backgroundColor: '#C8161D'} : {backgroundColor: '#667C8A'}}>
                                    {orderSize}
                                </span>}
                        </div>
                        <div className='navigation__button__label'>Cart</div>
                    </div>
                </LinkWithPrefUrl>
            }

            {window.device === 'desktop' &&
                <div className={activeButton === '/cart' ? 'navigation__button--active' : 'navigation__button'}
                    onClick={() => {toggleSideBar()}}
                >
                    <div className='navigation__button__icon'>
                        <CartIcon className='no_fill'/>
                        {orderSize > 0 && <span className='cartOrderSize'>{orderSize}</span>}
                    </div>
                    <div className='navigation__button__label'>Cart</div>
                </div>               
            }

            {/* {window.device === 'mobile' && isLogged &&
                <Link to=''>
                    <div className={activeButton === '/' ? 'navigation__button--active' : 'navigation__button'}
                        onClick={() => {clearUserContext(); history.push('/')}}
                    >
                        <div>
                            <FiLogOut style={{height: '23px', width: '23px', color: 'var(--secondary_color--light)'}} />
                        </div>
                        <div className='navigation__button__label'>Logout</div>
                    </div>
                </Link>
            } */}

            {/* <Link to='/more'>
                <div className={activeButton === '/more' ? 'navigation__button--active' : 'navigation__button'}>
                    <div className='navigation__button__icon'>
                        <MoreIcon className='no_stroke'/>
                    </div>
                    <div className='navigation__button__label'>More</div>
                </div>
            </Link> */}
           

        </div>
    )
}
