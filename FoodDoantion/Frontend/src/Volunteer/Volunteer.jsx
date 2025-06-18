import React, { useEffect, useState } from 'react';
import './Volunteer.css';
// import "bootstrap/dist/css/bootstrap.min.css";

import deliveryBoy from '../assets/deliveryboy.gif';
import { Donations } from './Donations';
import { Dashboard } from './Dashboard';
import { Instruction } from './Instruction';
import { useLocation, useNavigate } from 'react-router-dom';

export const Volunteer = () => {

  const locationNav = useLocation();
  const {email} = locationNav.state || {};
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const toRotate = [
    "A meal from you can change a life.",
    "Your delivery brings hope.",
    "Every delivery feeds both body and soul.",
    "You bring kindness with every meal.",
  ];
  const period = 2000;
  //for dashboard active whenever teh state is changed
  const [isActiveDashboard,setActiveDashboart]=useState(false);

// State to track the active section
const [activeSection, setActiveSection] = useState('donations');
const [activeButton,setActiveButton]=useState('donations');
// Function to handle section change
const showContent = (section) => {
    setActiveSection(section);
    setActiveButton(section);
};
const getButtonStyle=(button)=>{
  return activeButton===button ?{color:'#00fd00'}:{}
};

// typing text effect animation
  useEffect(() => {
    let timer;
    const tick = () => {
      const i = loopNum % toRotate.length;
      const fullTxt = toRotate[i];
      setText(isDeleting ? fullTxt.substring(0, text.length - 1) : fullTxt.substring(0, text.length + 1));

      if (!isDeleting && text === fullTxt) {
        // Start deleting after a delay
        timer = setTimeout(() => setIsDeleting(true), period);
      } else if (isDeleting && text === '') {
        // Start typing the next word after a delay
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      } else {
        timer = setTimeout(tick, isDeleting ? 100 : 200);
      }
    };

    timer = setTimeout(tick, isDeleting ? 100 : 200);

    return () => clearTimeout(timer);  // Clear previous timer on cleanup
  }, [text, isDeleting, loopNum]);  // Dependencies updated to rely on specific states

  // INJECT CSS for typing effect cursor
  useEffect(() => {
    const css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid black }";  // Typing cursor style
    document.head.appendChild(css);  // Append it to the head to apply globally

    return () => document.head.removeChild(css);  // Clean up when the component is unmounted
  }, []);

  
 

  return (
    <div>
      <div id="volunteerDetails" style={{ display: 'block' }}>
        <img
          src={deliveryBoy}
          style={{ height: '50%', transform: 'rotateY(180deg)', marginTop: '90px' }}
          alt="Volunteer"
        />
        <h1 style={{ fontSize: '50px', fontWeight: 700, padding: '0px', margin: '0px' }} id='VolText1'>Hi Volunteer</h1>
        <h1 style={{ fontSize: '30px', padding: '0px', margin: '0px' }} id='VolText2'>
          <a href="#" style={{ color: '#4CAF50', textDecoration: 'none' }} className="typewrite">
            <span className="wrap">{text}</span>
          </a>
        </h1>
        <div id="mainSection">
          {/* Additional content can be added here if needed */}
        </div>
        <div id='volunteerContent'>
          <div>
            <nav class="navbar">
              <ul>
                <li><a href="#" id="donations"  onClick={() => {showContent('donations');}} style={getButtonStyle('donations') } >Donations</a></li>
                <li><a href="#" id="dashboard" onClick={() => {showContent('dashboard');setActiveDashboart(!isActiveDashboard);}} style={getButtonStyle('dashboard')}>Dashboard</a></li>
                <li><a href="#" id="profile" onClick={() => {showContent('instruction');}} style={getButtonStyle('instruction')}>Food Request</a></li>
              </ul>
            </nav>
            <div className="content-box" id="content-box1">
            {activeSection==='donations'&& <Donations email={email}/> }
            {activeSection==='dashboard'&& <Dashboard email={email} isActiveDashboard={isActiveDashboard} /> }
            {activeSection==='instruction'&& <Instruction/> }
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
