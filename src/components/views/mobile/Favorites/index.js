import React from 'react'
import { useContext } from 'react'

import UserContext from '../../../../contexts/user'

import Page from '../../../layouts-templates/mobile/Page'
import Space from '../../../common/Space'
import NamedSection from '../../../layouts-templates/NamedSection'
import DishesTypesList from '../../../common/DishesTypesList'
import DishesGridList from '../../../common/DishesGridList'
import UserNotLoggedPrompt from '../../../common/UserNotLoggedPrompt'

export default function Favorites() {

    const {isLogged} = useContext(UserContext)
    
    return (
        
        <Page>
           
           {/* TOP BAR */}
           {isLogged ? <Space height='20px'/> : <UserNotLoggedPrompt/>}

            {/* CONTENT   */}
            <>                
                <div className='home_page__dishes_types_list'>
                    <DishesTypesList></DishesTypesList>
                </div>
                
                <div className='home_page__dishes_menu_list'>
                    <NamedSection name='Favorites dishes' link='View all'>
                        <DishesGridList type='fav_dishes'/>
                    </NamedSection>
                </div>
            </>

        </Page>
    )
}
