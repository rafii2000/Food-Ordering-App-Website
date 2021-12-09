import React from 'react'

//components
import HeroMessage from '../../../common/HeroMessage'
import SearchBar from '../../../common/SearchBar'
import DishesTypesList from '../../../common/DishesTypesList'
import DishesGridList from '../../../common/DishesGridList'
import NamedSection from '../../../layouts-templates/NamedSection'

import './style.css'

export default function Content() {

    return (
        <div className='home_page__content'>
            
            <div className='home_page__header'>
                <HeroMessage></HeroMessage>
            </div>

            <div className='home_page__search_bar'>
                <SearchBar></SearchBar>
            </div>
            
            <div className='home_page__dishes_types_list'>
                <DishesTypesList></DishesTypesList>
            </div>
            
            <div className='home_page__dishes_menu_list'>
                <NamedSection name='Popular' link='View all'>
                    <DishesGridList/>
                </NamedSection>
            </div>

        </div>
    )
}
