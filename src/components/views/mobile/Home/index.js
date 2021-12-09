import React from 'react'

import Page from '../../../layouts-templates/mobile/Page'

import TopBar from '../../../layouts-templates/TopBar'
import MenuButton from '../../../common/Buttons/MenuButton'
import ProfileButton from '../../../common/Buttons/ProfileButton'
import UserLocation from '../../../common/UserLocation'


import Content from './content'


export default function Home() {

    return (
        
        <Page>

            <TopBar
                left={<MenuButton/>}
                middle={<UserLocation/>}
                right={<ProfileButton/>}
            />

            
            <Content></Content>

        </Page>
           
    )
}




