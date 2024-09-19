import React from 'react'
import './Nav.css'

function Navbar() {



  return (
    <>
        <nav className='nav'>
            <h1 className='app'>Wellcome to the app</h1>
            <ul className='list'>
                 <a href="./About.html" className='about'><li><b>About Us</b></li></a>
            </ul>
        </nav>

    </>
  )
}

export default Navbar
