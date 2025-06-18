import React, { useState } from 'react';
import './DonatorPage.css';
import leftHand from '../assets/leftHand.png';
import Hand from '../assets/hand.png';
import UserLogo from '../assets/user.png'
import { useLocation, useNavigate } from 'react-router-dom';
import { BulkDonation } from './BulkDonation';

export const DonatorPage = () => {
  const [formData, setFormData] = useState({
    foodName: '',
    quantity: '',
    cookedTime: '',
    pickupDate: '',
    location: '',
    latitude: null,
    longitude: null,
  });
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);
  const locationNav = useLocation();
  const {email} = locationNav.state || {};
  const [bulk,setBulk]=useState(false);
  const[dashBDisplay,setDashBDisplay]=useState(false);
  const getLocation = (event) => {
    event.preventDefault();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setFormData((prevData) => ({
            ...prevData,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
          setError(null);
        },
        (err) => {
          setError('Failed to get location. Please enable location services.');
          console.error('Geolocation error:', err);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { foodName, quantity, cookedTime, pickupDate, location, latitude, longitude } = formData;

    // Ensure valid data before submission
    const submissionData = {
      foodName: foodName || null,
      quantity: Number(quantity) || null, // Ensure quantity is a number
      cookedTime: cookedTime ? `${pickupDate}T${cookedTime}:00` : null, // Combine date and time
      pickupDate: pickupDate ? new Date(pickupDate).toISOString() : null,
      location: location || null,
      latitude: latitude !== null ? Number(latitude) : null,
      longitude: longitude !== null ? Number(longitude) : null,
      userId: email, // Replace with actual user ID logic
      volunteerId:"null",
      foodStatus: 'Pending',
    };

    console.log('Submitting formData:', submissionData);

    try {
      const response = await fetch('http://localhost:8000/auth/adddonation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message || 'Donation details saved successfully!');
        setFormData({
          foodName: '',
          quantity: '',
          cookedTime: '',
          pickupDate: '',
          location: '',
          latitude: null,
          longitude: null,
        });
      } else {
        alert(data.error || 'Failed to save donation details.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Internal server error');
    }
  };

  return (
    <div id="donationDetails" style={{ display: 'block' }}>
      <div id="blobDonate">
        <div id="netralizer">
          <img id="rightHand" className={`rightHand ${dashBDisplay?"moveRightHand":''}`} src={Hand} alt="Right Hand" />
          <img id="leftHand" className={`leftHand ${dashBDisplay?"moveLeftHand":''}`} src={leftHand} alt="Left Hand" />
          <img className={`userLogo ${dashBDisplay?"moveUser":''}`} src={UserLogo} alt="user logo"></img>
          
        </div>
      </div>

      <div id="textSection" style={{ opacity: 1 }}>
        <h1>INDIVIDUAL DONATION</h1>
        <p style={{ textAlign: 'center', paddingRight: '10px' }}>
          Join Us in Making a Difference, we believe that every act of kindness, no matter how small, has the power to
          make a significant impact. By contributing to our cause, you can be a part of something bigger, a movement
          dedicated to alleviating hunger and providing hope to those in need.
        </p>
        <div id="textbox">
          <h4>Why Donate?</h4>
          <p>
            Millions of individuals and families around the world struggle with food insecurity every day. Your donation
            can help provide nutritious meals to those who are most vulnerable, offering them not only sustenance but
            also dignity and hope for a better tomorrow. With your support, we can make a tangible difference in the
            lives of countless individuals, one meal at a time.
          </p>
        </div>
        <div id="textbox">
          <h4>Impact of Your Donation</h4>
          <p>
            Your generosity enables us to reach more individuals and families in need, providing them with access to
            essential food supplies and resources. From children facing hunger to seniors struggling to make ends meet,
            your donation has the power to transform lives and build stronger, more resilient communities. Together, we
            can create a world where no one has to go to bed hungry.
          </p>
        </div>
      </div>

      {/* dashboard part container */}
      <div className={`dashboardContainer ${dashBDisplay?"moveDashBoard":''}`}>
        <h1>DASHBOARD</h1>
        
        <p>Hi UserName , Here is Your Donation Data </p>
        <div className='DBscoreCard'>
          <div className='MonthScore'><span>100</span><p>Total Donations</p></div>
          <div className='LastMonthScore'><span>1</span><p>This month</p></div>
        </div>
        <a>Become A Volunteer & helps in Food Delivery &#8594;</a>
      </div>


      <div className="options" style={{ display: 'block' }}>
        <div id="dashboard" onClick={()=>{setDashBDisplay(!dashBDisplay)}}>Dashboard</div>
        <div id="choice">
          <div className="box">
            <h3>INDIVIDUAL DONATION</h3>
          </div>
          <div className="box" onClick={()=>{setBulk(!bulk)}}>
            <h3>BULK DONATION</h3>
          </div>
          <div className="box">
            <h3>NGO DETAILS</h3>
          </div>
        </div>

        <div id="formArea">
          <div id="round1" ></div>
          <div id="round2"></div>

          <form id="donationForm" className="form-input" onSubmit={handleSubmit}>
            <h3>Enter Food Details</h3>
            <input
              type="text"
              id="foodName"
              name="foodName"
              placeholder="Item Name"
              value={formData.foodName}
              onChange={handleChange}
              style={{width:"175px"}}
            />
            <input
              type="number"
              id="quantity"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
            <br />
            <div className='labelContainer'> 
              <label htmlFor="cookedTime" >Cooked Time</label>
              <label htmlFor="pickupDate" >Cooked Date</label>
              </div>
            {/* <label htmlFor="cookedTime" style={{position:"absolute"}}>Cooked Time</label> */}
            
            <input
              type="time"
              id="cookedTime"
              name="cookedTime"
              value={formData.cookedTime}
              onChange={handleChange}
              style={{width:"90px"}}
            />
            <br />

            {/* <label htmlFor="pickupDate" style={{position:"absolute"}}>Cooked Date</label> */}
            <br />
            <input
              type="date"
              id="pickupDate"
              name="pickupDate"
              value={formData.pickupDate}
              onChange={handleChange}
            />
            <br />

            <input
              type="text"
              id="location"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              style={{width:"290px"}}
            />
            <br />

            <button onClick={getLocation} id="getLocationButton" style={{height:"25px",border:"none",backgroundColor:"white",boxShadow:"0px 0px 3px black"}}>
              Use my current location
            </button>
            <p id="location">
              {location.latitude && location.longitude ? (
                <>
                  Latitude: {location.latitude}, Longitude: {location.longitude}
                </>
              ) : error ? (
                error
              ) : (
                ' '
              )}
            </p>

            <button type="submit" className="btn" style={{marginTop:"5px"}}>
              Donate Food
            </button>
          </form>
        </div>
      </div>
      {bulk && <BulkDonation setBulk={setBulk} bulk={bulk} />} 
     
    </div>
  );
};
