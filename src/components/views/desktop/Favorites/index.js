import React from 'react'

//components
import DesktopPage from '../../../layouts-templates/desktop/DesktopPage'
import NamedSection from '../../../layouts-templates/NamedSection'
import DishesTypesList from '../../../common/DishesTypesList'
import DishesGridList from '../../../common/DishesGridList'
import Cart from '../../../common/Cart/index'

import './style.css'




const MainMemo = React.memo(() => 
    <>
         <div className='desktop_page__dishes_types_list'>
            <DishesTypesList/>
        </div>

        <div className='desktop_page__content'>
            <NamedSection name='Favorites dishes' link='View all'>
                <DishesGridList type='fav_dishes'/>
            </NamedSection> 
        </div>
    </>
)

const SideBarMemo = React.memo(() => <Cart/> )



export default function Favorites() {

    return (
        
        <DesktopPage sideBar={true}>
            
            <MainMemo/>
        
            <SideBarMemo/>
        
        </DesktopPage>
    )
}
