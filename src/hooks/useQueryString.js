
import { useCallback } from "react"
import { useHistory, useLocation } from "react-router"


export const useQueryString = () => {

    const history = useHistory()
    const location = useLocation()


    const updateQueryString = useCallback(
        (key, value) => {
            
            if(!location.search){
                //start query string
                history.push(location.pathname + `?${key}=${value}`)
            }
            else{
                //add new key-value pair
                const queryParams = new URLSearchParams(location.search)
                queryParams.set(key, value)
                history.push(location.pathname + '?' +  queryParams.toString())
            }
           
        },
        [location, history],
    )

    const getQueryStringParamValue = useCallback(
        (key) => {
            const queryParams = new URLSearchParams(location.search)
            if(queryParams.get(key) === null)
                return ''
            else
                return queryParams.get(key)
        },
        [location],
    )


    const getQueryStringParams = useCallback(
        () => {

            let queryStringParams = {}
            const queryParams = new URLSearchParams(location.search)
            queryParams.forEach((value, key) =>{
                queryStringParams[key] = value
            })

            return queryStringParams
        },
        [location],
    )
    
    return{
        updateQueryString,
        getQueryStringParamValue,
        queryStringParams: getQueryStringParams(),
    }


}