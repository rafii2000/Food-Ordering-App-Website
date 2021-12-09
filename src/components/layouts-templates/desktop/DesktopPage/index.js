import React from 'react'

import useDesktopPage from './logic'
import ProfileButton from '../../../common/Buttons/ProfileButton'
import LogOutButton from '../../../common/Buttons/LogOutButton'
import Navigation from '../../../common/Navigation'

import {BsChevronLeft} from 'react-icons/bs'

import './style.css'

export default function DesktopPage({children, sideBar}) {
    
    const {cartRef, sideBarRef, sideBarToggleButtonRef, toggleSideBar} = useDesktopPage()

    return (
        <div className='desktop_page'>
            
            <nav>
                <div className='nav__overflow_wrapper'>
                    <>
                        <ProfileButton/>
                        <Navigation/>
                        <LogOutButton/>
                    </>
                </div>
            </nav>

            <main>
                {children[0]}
            </main>

            {sideBar &&
                <div className='side_bar'>

                    <div className='side_bar__relative_wrapper' ref={sideBarRef}>
                        <div className='side_bar__content' ref={cartRef} wobble={0} onAnimationEnd={() => {cartRef.current.attributes.wobble.value = 0}}>
                            {children[1]}
                        </div>

                        <div className='side_bar__curved_border'>
                            <div className='side_bar__toggle_button' ref={sideBarToggleButtonRef} onClick={() => toggleSideBar()}>
                                <BsChevronLeft/>
                            </div>
                        </div>
                    </div>

                </div>
            }
            

        </div>
    )
}

