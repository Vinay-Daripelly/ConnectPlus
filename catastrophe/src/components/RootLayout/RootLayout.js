import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbars from '../NavigationComp/Navbars';
function RootLayout() {
  return (
    <div>
        <Navbars/>
        <div style={{minHeight:'100vh'}}><Outlet/></div>
    </div>
  )
}

export default RootLayout