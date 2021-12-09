import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'

export default function LinkWithPrefUrl({children, pathname, search}) {

    const location = useLocation()

    return (
        <Link to={{pathname: pathname, search: search, state: {prefUrl: location.pathname}}}>
            {children}
        </Link>
    )
}
