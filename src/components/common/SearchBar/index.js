import React from 'react'

import { useSearchBar } from './logic' 

import {ReactComponent as HandGlassIcon} from '../../../assets/icons/home/svg/hand_glass.svg'
import {GrClose} from 'react-icons/gr'


import './style.css'


export default function SearchBar() {

    console.log('SearchBar rerender')
    const {inputRef, toggleClearButton, clearInput, setSearchValue} = useSearchBar()
   
       
    return (
        //OLD VERSION - with React Router searchPhrase store in query param
    
        //NEW VERSION - with contextAPI
        <div className='search_bar'>
            <button onClick={(e) => null}><HandGlassIcon/></button>
            <input placeholder='Search our delicious burgers' ref={inputRef}
                onChange={(e) => setSearchValue(e.target.value)}
            ></input>
            <button style={toggleClearButton()} onClick={() => clearInput()}><GrClose/></button>
        </div>
    )
}
