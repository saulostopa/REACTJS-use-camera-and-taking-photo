import React from 'react'
import './header.css'
import logo from './../../assets/images/logo.png'; // with import

export const Header = () => (
  <header>
    <div className='wrapper'>
      <div>
          <img src={logo} alt={'Logo'} />
          {/* <h1>COOP</h1> */}
      </div>
    </div>
  </header>
)