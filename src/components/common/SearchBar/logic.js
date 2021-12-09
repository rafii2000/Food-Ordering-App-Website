import { useEffect, useRef,useContext } from "react"
import SearchContext from '../../../contexts/search_bar'

import { useLocation } from "react-router"

export const useSearchBar = () => {

    const inputRef = useRef()
    const {setSearchPhrase} = useContext(SearchContext)
    const location = useLocation()
      

       
    const toggleClearButton = () => {
        
        if(inputRef.current && inputRef.current.value.length > 0)
            return {display: 'block'}
        else
            return {display: 'none'}
    }

    const clearInput = (e) => {
        inputRef.current.value = ''
        setSearchPhrase('')
    }

    const setSearchValue = (value) => {
        setSearchPhrase(value)
    }

    
    useEffect(() => {
        if(location.state && location.state.prefUrl !== location.pathname){
            setSearchPhrase('')
        }
            
    }, [location, setSearchPhrase ])

    return{
        inputRef,
        clearInput,
        toggleClearButton,
        setSearchValue,
    }
}