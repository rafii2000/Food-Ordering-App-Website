import React from 'react'

//components: templates
import DesktopPage from '../../../layouts-templates/desktop/DesktopPage'
import NamedSection from '../../../layouts-templates/NamedSection'

//components: common
import DishesTypesList from '../../../common/DishesTypesList'
import SearchBar from '../../../common/SearchBar'
import HeroMessage from '../../../common/HeroMessage'
import UserLocation from '../../../common/UserLocation'
import DishesGridList from '../../../common/DishesGridList'
import Cart from '../../../common/Cart/index'

import './style.css'


const MainMemo = React.memo(() => 
    <>
        <header>
            <div className='header__left_side'>
                <HeroMessage/>
                <SearchBar/>    
            </div>
                
            <div className='header__right_side'>
                <UserLocation/>
            </div>
        </header>


        <div className='desktop_page__dishes_types_list'>
            <DishesTypesList/>
        </div>

        <div className='desktop_page__content'>
            <NamedSection name='Menu' link='View all'>
                <DishesGridList/>
            </NamedSection>
        </div>
    </>
)

const SideBarMemo = React.memo(() => <Cart/> )



export default function Home() {

    return (
        
        <DesktopPage sideBar={true}>
                       
            <MainMemo/>
            
            <SideBarMemo/>

        </DesktopPage>
    )
}
