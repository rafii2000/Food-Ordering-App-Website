import React from 'react'
import { useHistory } from 'react-router'


import {ReactComponent as LeftArrow} from '../../../../assets/icons/buttons/svg/left_arrow.svg'

// import '../style.css'

export default function ReturnButton() {
    
    const history = useHistory()

    return (
        <div className='btn__square  btn__square--small  btn__square--shadow' onClick={() => {history.goBack()}}>
            <LeftArrow/>
        </div>
    )

}
