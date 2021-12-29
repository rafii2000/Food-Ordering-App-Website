import React from 'react'

import Page from '../../../layouts-templates/mobile/Page'
import TopBar from '../../../common/TopBar'
import ReturnButton from '../../../common/Buttons/ReturnButton'
import MoreButton from '../../../common/Buttons/MoreButton'
import Content from '../../../common/Cart'


export default function Cart() {
    return (
        
        <Page scrollToTop={true}>

            <TopBar
                left={<ReturnButton/>}
                middle={'Cart'}
                right={<MoreButton/>}
            />

            <Content></Content>
            
        </Page>
           
    )
}




