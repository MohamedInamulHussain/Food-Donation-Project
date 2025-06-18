import React from 'react'
import './Nav.css'
import { DonatorPage } from '../DonatorPage/DonatorPage'
import { Volunteer } from '../Volunteer/Volunteer'
import { Link } from 'react-router-dom'
export const Nav = () => {
  return (
    <>
    <div className="header1">
    <h1>Food Donation App</h1>
    <div className="navlinks">
      <Link to="/" id='navElements'>Home</Link>
      <Link to="/login" id='navElements'>Donate Food</Link>
      <Link to="/volunteer-login" id='navElements'>Volunteer</Link>
      <Link to="/Food Request"  id='navElements'>Request Food</Link>
      <Link to="/About Us" id='navElements'>About Us</Link>
    </div>
  </div>
  </>
  )
}
