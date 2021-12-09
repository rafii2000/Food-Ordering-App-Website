import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'

import {ReactComponent as ThumbsUpIcon} from '../../../../assets/icons/buttons/svg/thumbs-up.svg'
import {ReactComponent as ThumbsDownIcon} from '../../../../assets/icons/buttons/svg/thumbs-down.svg'

import './style.css'

const RateSection = ({id, title, srcImg, setUserRates}) => {

    const [activeBtn, setActiveBtn] = useState(false)
    
    return(
        <div className='rate_subpage__rate_section'>

            {title}
           
            <div className='rate_subpage__rate_section__group'>
                <div className={`btn__circle  btn__circle--medium ${activeBtn === 'down' ? 'rate_section--activeBtn' : ''}`}
                    onClick={() => {setActiveBtn('down'); setUserRates(id, 'down')}}>
                    <ThumbsDownIcon></ThumbsDownIcon>
                </div>
                <div className='rate_section__image'>
                    <img src={process.env.PUBLIC_URL + srcImg} alt=''></img>
                </div>
                <div className={`btn__circle  btn__circle--medium ${activeBtn === 'up' ? 'rate_section--activeBtn' : ''}`}
                    onClick={() => {setActiveBtn('up'); setUserRates(id, 'up')}}>
                    <ThumbsUpIcon></ThumbsUpIcon>
                </div>
            </div>
        
        </div>
    )

}

export default function Content() {

    const history = useHistory()
    const [userRates, _setUserRates] = useState([null, null])

    useEffect(() => {

        if( !userRates.includes(null) ) {
            history.push('/')
        }
    }, [history, userRates])

    const setUserRates = (id, rate) => {
        
        const newArray = userRates.map(a => (a));
        newArray[id] = rate
        _setUserRates(newArray)
    }


    return (
        <div className='rate_subpage__content'>

            <header>
               <h1>Rate your service</h1>
           </header>

            <RateSection
                id = {0}
                title={<h1>How was <br/> your <span>food?</span> </h1>}
                srcImg={`assets/dishes_photos2/burgers/burger_2/photo.png`}
                setUserRates={setUserRates}
            >
            </RateSection>
            
            <RateSection
                id = {1}
                title={<h1>How was your <br/> <span>delivery?</span> </h1>}
                srcImg={`assets/delivery_mens/deliverymen1.png`}
                setUserRates={setUserRates}
            >
            </RateSection>
        </div>
    )
}
 



