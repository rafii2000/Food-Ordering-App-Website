import React from 'react'

import DesktopPage from '../../../layouts-templates/desktop/DesktopPage'
import AccountForm from '../../../common/Forms/AccountForm'


export default function Account() {

    console.log('Account rerender')

    return (
       
        <DesktopPage sideBar={false}>
            
            <AccountForm></AccountForm>
            <></>

        </DesktopPage>
    )
}
