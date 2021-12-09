import React from 'react'
import { useState } from 'react'


const SearchContext = React.createContext('')

export default SearchContext



export  function SearchContextProvider({children}) {
    
    // const location = useLocation()
    const [searchPhrase, setSearchPhrase] = useState('')
    
    console.log('SearchContextProvider')
    
    return (
        <SearchContext.Provider value={{
            searchPhrase,
            setSearchPhrase
        }}>
            {children}
        </SearchContext.Provider>
    )
}
