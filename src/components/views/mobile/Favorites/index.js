import React from 'react'
import { useContext } from 'react'

import UserContext from '../../../../contexts/user'

import Page from '../../../layouts-templates/mobile/Page'
import NamedSection from '../../../common/NamedSection'
import DishesTypesList from '../../../common/DishesTypesList'
import DishesGridList from '../../../common/DishesGridList'
import UserNotLoggedPrompt from '../../../common/UserNotLoggedPrompt'

export default function Favorites() {

    const {isLogged} = useContext(UserContext)
    
    return (
        
        <Page>
           
           {/* TOP BAR */}
           {isLogged ? <></> : <UserNotLoggedPrompt/>}

            {/* CONTENT   */}
            <>                
                                
                <DishesTypesList></DishesTypesList>
                
                <NamedSection name='Favorites dishes' link='View all'>
                    <DishesGridList type='fav_dishes'/>
                </NamedSection>
                
            </>

        </Page>
    )
}
