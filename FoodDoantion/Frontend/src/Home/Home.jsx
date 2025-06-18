import React from 'react'
import './Home.css'
import homepic from '../assets/homePikCroped.png'
import {Link} from 'react-router-dom'
export const Home = () => {
  return (
    <>
    <div className="HomeContainer">
      <div id='blob'></div>
    <div className="welcome-section">
      <div className="greetings">
        
        <h2 id="greet1">Be The Reason </h2>
        <h2 id="greet2">Someone Smiles Today!</h2>
        
      </div>
      <img src={homepic} id="homePik"></img>
    </div>

    <div className="options1">
      <div className="HomeCard1">
        <h3 id='Htext'>Donator</h3>
        <p id='Hpara'>Donate food and make a difference</p>
        <Link to="/login" className="btn1" >Donate Now</Link>
      </div>
      <div className="HomeCard1">
        <h3 id='Htext'>Volunteer</h3>
        <p id='Hpara'>Join us as a volunteer</p>
        <br></br>
        <Link to="/volunteer-login" className="btn1">Volunteer Now</Link>
      </div>
      <div className="HomeCard1">
        <h3 id='Htext'>People in Need</h3>
        <p id='Hpara'>Request food assistance</p><br></br>
        <Link to="/Food Request" className="btn1">Request Food</Link>
      </div>
    </div>
<br></br>
  
  </div>
 </>
  )
}
