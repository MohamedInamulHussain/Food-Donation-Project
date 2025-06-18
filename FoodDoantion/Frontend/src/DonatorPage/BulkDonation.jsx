import React from 'react'
import './DonatorPage.css'
import { useState } from 'react';
import image1 from '../assets/charityImages/1.jpg';
import image2 from '../assets/charityImages/2.jpg';
import image3 from '../assets/charityImages/3.avif';
import image4 from '../assets/charityImages/4.webp';
import image5 from '../assets/charityImages/5.jpg';
import image6 from '../assets/charityImages/6.jpg';
export const BulkDonation = ({setBulk,bulk}) => {
 const[closeBtn,setCloseBtn]=useState(0);
    const cardData = [
        {
            image: image1,
            name: 'Mother Teresa Old Age Home',
            contact: '959772132',
            address: 'Vellenchery, Chennai',
        },
        {
            image: image2,
            name: 'Sunshine Children Home',
            contact: '985623457',
            address: 'Anna Nagar, Chennai',
        },
        {
            image: image3,
            name: 'Helping Hands Shelter',
            contact: '912345678',
            address: 'Tambaram, Chennai',
        },
        {
            image: image4,
            name: 'Greenfield Orphanage',
            contact: '987654321',
            address: 'Velachery, Chennai',
        },
        {
            image: image5,
            name: 'Hope Shelter',
            contact: '998877665',
            address: 'Kodambakkam, Chennai',
        },
        {
            image: image6,
            name: 'Care Old Age Home',
            contact: '912345654',
            address: 'Adyar, Chennai',
        },
    ];

    return (
        <>
            <div>
                <div className='mainBox' style={{zIndex:10}}>
                    <span id='closeBtn' onClick={()=>{setBulk(!bulk)}}>X</span>
                    <center>
                        {
                        <div className='innerBox' >
                            <h2>Bulk Donation</h2>
                            <div className='cardContainer'>
                                {cardData.map((card, index) => (
                                    <div className="donationCard" key={index}>
                                        <div
                                            id="cardimage"
                                            style={{ backgroundImage: `url(${card.image})` }}
                                        ></div>
                                        <div id="cardTextArea">
                                            <h5 id="homeName">{card.name}</h5>
                                            <h6 id="homeDetails">Contact: {card.contact}</h6>
                                            <h6 id="homeDetails">Address: {card.address}</h6>
                                        </div>
                                    </div>
                                ))}

                            </div>

                        </div>
                        }
                    </center>
                </div>
            </div>
        </>
    )
}
