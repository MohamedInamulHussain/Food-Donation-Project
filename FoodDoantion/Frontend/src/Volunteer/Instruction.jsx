import React, { useEffect, useState } from 'react';

export const Instruction = () => {
  const [foodRequests, setFoodRequests] = useState([]);

  useEffect(() => {
    const fetchFoodRequests = async () => {
      try {
        const response = await fetch('https://food-donation-project-zk5l.onrender.com/auth/food-requests');
        const data = await response.json();
        setFoodRequests(data);
      } catch (error) {
        console.error('Error fetching food requests:', error);
      }
    };

    fetchFoodRequests();
  }, []);

  return (
    <div className="instructions-container">
      <h2>Food Requests</h2>
      <div className="food-requests-list">
        {foodRequests.length > 0 ? (
          foodRequests.map((request) => {
            let latitude = null;
            let longitude = null;

            // ✅ Case 1: If location is an object with latitude & longitude
            if (typeof request.location === 'object' && request.location.latitude && request.location.longitude) {
              latitude = request.location.latitude;
              longitude = request.location.longitude;
            }

            // ✅ Case 2: If location is a string with "Latitude: X, Longitude: Y"
            else if (typeof request.location === 'string' && request.location.includes('Latitude:')) {
              const match = request.location.match(/Latitude:\s*([\d.-]+),\s*Longitude:\s*([\d.-]+)/);
              if (match) {
                latitude = match[1];
                longitude = match[2];
              }
            }

            // ✅ Case 3: If location is a simple "X, Y" string
            else if (typeof request.location === 'string' && request.location.includes(',')) {
              const [lat, lon] = request.location.split(',').map(coord => coord.trim());
              latitude = lat;
              longitude = lon;
            }

            return (
              <div key={request._id} className="food-card">
                <h3>{request.name}</h3>
                <p><strong>Contact:</strong> {request.contactNumber}</p>
                <p><strong>Location:</strong> {latitude && longitude ? `${latitude}, ${longitude}` : 'Not Available'}</p>
                <p><strong>Quantity:</strong> {request.quantity}</p>
                <p><strong>Date:</strong> {new Date(request.createdAt).toLocaleDateString()}</p>

                {/* 📍 Show Google Maps link if lat/lon exist */}
                {latitude && longitude ? (
                  <a
                    href={`https://www.google.com/maps?q=${latitude},${longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📍 Click here for location
                  </a>
                ) : (
                  <p>📍 Location not available</p>
                )}
              </div>
            );
          })
        ) : (
          <p>No food requests found.</p>
        )}
      </div>
    </div>
  );
};
