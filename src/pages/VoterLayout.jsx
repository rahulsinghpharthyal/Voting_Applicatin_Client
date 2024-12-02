import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

const VoterLayout = () => {
  return (
    <div>
      <div>
        <Header/>
      </div>
      <Outlet/>
    </div>
  )
}

export default VoterLayout
