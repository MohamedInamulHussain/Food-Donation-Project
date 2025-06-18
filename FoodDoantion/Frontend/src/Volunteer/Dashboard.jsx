import React, { useEffect, useState } from 'react';
import { MdLocationOn } from 'react-icons/md';
import './Dashboard.css';
import './Volunteer.css';

export const Dashboard = ({ email,isActiveDashboard }) => {
    const [filteredFood, setFood] = useState([]); // Initialize with an empty array

    useEffect(() => {
        console.log("Dashboard Mounted: Fetching data...");
        const fetchDonations = async () => {
            try {
                const response = await fetch(`http://localhost:8000/auth/filtered-Food/${email}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFood(data);
            } catch (error) {
                console.error('Error fetching donations:', error);
            }
        };
    
        if (email) {
            fetchDonations();
        }
    }, [email,isActiveDashboard]);

    return (
        <>
            <div className='CardBox' style={{ transform: 'scale(0.7)' }}>
                <div className='DashboardCard'>
                    <h1 style={{ fontSize: '60px', marginBottom: '0px', marginTop: '0px' }}>
                        {filteredFood.length}
                    </h1>
                    <h3 style={{ marginBottom: '0px', marginTop: '-10px', fontWeight: 'bolder' }}>
                        Active Deliveries
                    </h3>
                </div>
            </div>

            <div style={{ marginLeft: '26px' }}>
                <span>
                    <h5 style={{ position: 'absolute', marginLeft: '10px', backgroundColor: '#f4f4f4', display: 'inline-block', top: '231px', padding: '0px 5px 0px 5px', zIndex: '3' }}>
                        Active Deliveries
                    </h5>
                </span>

                <div className='deliveryListBox'>
                    {filteredFood.length > 0 ? (
                        filteredFood.map((donation) => (
                            <div key={donation._id} className="donation-card">
                                <h4>{donation.foodName || '[Food Item Name]'}</h4>

                                <div className="info-row">
                                    <p><strong>Quantity:</strong> {donation.quantity || 'N/A'}</p>
                                    <p><strong>Timing:</strong> {donation.cookedTime ? new Date(donation.cookedTime).toLocaleTimeString() : 'N/A'}</p>
                                    <p><strong>Date:</strong> {donation.pickupDate ? new Date(donation.pickupDate).toLocaleDateString() : 'N/A'}</p>
                                </div>

                                <div className="info-row">
                                    <p><strong>Address:</strong> {donation.location || 'N/A'}</p>
                                    <p><strong>Contact:</strong> {donation.contact || 'N/A'}</p>
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
                                    <button className="cancel">Cancel</button>
                                    <button className="picked-up">Picked Up</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No active deliveries available.</p>
                    )}
                </div>
            </div>
        </>
    );
};
