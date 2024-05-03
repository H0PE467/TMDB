import React from 'react'
import { ROUTES } from '../../Routes/constants' 
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <nav className='flex justify-between items-center h-20 px-5 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.5)]'>
        <h1 className='text-2xl font-bold'>Movies DB</h1>
        <ul className='flex gap-7'>
            <li> <Link to={ ROUTES.HOME }> HOME</Link></li>
            <li> <Link to={ ROUTES.POPULAR }> POPULAR</Link></li>
            <li> <Link to={ ROUTES.TOPRATED }> TOP RATED</Link></li>
            <li> <Link to={ ROUTES.NOWPLAYING }> NOW PLAYING</Link></li>
            <li> <Link to={ ROUTES.POPULAR }> MY FAVORITES</Link></li>
        </ul>
    </nav>
  )
}

export default Header