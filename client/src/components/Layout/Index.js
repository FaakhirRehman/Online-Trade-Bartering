import React from 'react'
import { Header } from '../Header/Index'
import { MenuHeader } from '../MenuHeader/Index'

/**
* @author
* @function Layout
**/

export const Layout = (props) => {
    return (
        <>
            <Header />
            <MenuHeader />
            {props.children}
        </>
    )
}

export default Layout;