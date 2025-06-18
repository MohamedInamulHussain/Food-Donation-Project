import React, { useState, useEffect } from 'react';
import { MdLocationOn } from "react-icons/md";
import './Volunteer.css';

export const Donations = ({ email }) => {
  const [donations, setDonations] = useState([]);
 
  useEffect(() => {
    let isMounted = true; 
    // Track if component is mounted

    const fetchDonations = async () => {
      try {
        const response = await fetch('https://food-donation-project-zk5l.onrender.com/auth/Volunteer');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Filter only pending status donations
        const pendingDonations = data.filter(donation => donation.foodStatus === 'Pending');
        
        if (isMounted) setDonations(pendingDonations);
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    };

    fetchDonations();

    return () => {
      isMounted = false; // Cleanup function
    };
  }, []);

  const handleAccept = async (donationId) => {
   
   

    try {
      const response = await fetch(`https://food-donation-project-zk5l.onrender.com/auth/update-donation/${donationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          volunteerId: email, // Assign volunteer's email
          foodStatus: 'Accepted' // Change status to "Accepted"
        })
      });

      const responseData = await response.json();
      console.log("Response from server:", responseData);

      if (!response.ok) {
        throw new Error(responseData.msg || 'Failed to update donation');
      }

      // Remove accepted donation from UI
      setDonations((prevDonations) => prevDonations.filter(donation => donation._id !== donationId));
      alert('Donation Accepted Successfully!');
    } catch (error) {
      console.error('Error accepting donation:', error);
      alert("Error accepting donation: " + error.message);
    }
  };

  return (
    <>
      <div className="main-content">
        <h2>Food Donation List</h2>

        {donations.length > 0 ? (
          donations.map((donation) => (
            <div key={donation._id} className="donation-card">
              <h4>{donation.foodName || '[Food Item Name]'}</h4>

              <div className="info-row">
                <p><strong>Quantity:</strong> {donation.quantity || 'N/A'}</p>
                <p><strong>Cooked Time:</strong> {donation.cookedTime ? new Date(donation.cookedTime).toLocaleTimeString() : 'N/A'}</p>
                <p><strong>Cooked Date:</strong> {donation.pickupDate ? new Date(donation.pickupDate).toLocaleDateString() : 'N/A'}</p>
              </div>

              <div className="info-row">
                <p><strong>Address:</strong> {donation.location || 'N/A'}</p>
              </div>

              <div className='DonatorLocation' style={{ position: 'relative', top: '-10px' }}>
                <a
                  href={`https://www.google.com/maps?q=${donation.latitude},${donation.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MdLocationOn style={{ height: '23px', width: '23px', paddingTop: '10px', color: 'black' }} />
                  <span style={{ padding: '0px', position: 'absolute', paddingTop: '13px' }}>
                    <strong>Click here for location</strong>
                  </span>
                </a>
              </div>

              <div className="action-buttons">
                <button className="accept" onClick={() => handleAccept(donation._id)}>Accept</button>
                <button className="cancel">Cancel</button>
              </div>
            </div>
          ))
        ) : (
          <p>No pending food donations available at the moment.</p>
        )}
      </div>
    </>
  );
};
