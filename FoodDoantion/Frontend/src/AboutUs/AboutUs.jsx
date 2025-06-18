import React from 'react'
import './AboutUs.css'
import vissionImage from '../assets/vissionImage.png'
export const AboutUs = () => {
    return (
        <>
            <div className='aboutUsContainer'>
                <div className='missionArea'>
                    <h1 style={{ fontWeight: '400' }}>OUR MISSION</h1>
                    <div>Working towards an India free of hunger and malnutrition.</div>
                </div>
                <div className='vissionArea'>
                    <h1 style={{ fontWeight: '400', fontSize: '3.1rem' }}>Our Vision</h1>
                    <div id='textContentVission'>
                        <p>Mealy is a non-profit organization dedicated to eradicate hunger and improve malnutrition outcomes in India.</p>
                        <p>We work toward this mission by supporting large-scale systemic interventions as well as providing essential food support to underserved communities in the form of cooked food.</p>
                        <p>Mealy works with on-ground non profit partners working on education and child/maternal malnutrition by providing regular meals to dependents.</p>
                    </div>
                    <div id='vissionImageSection'>
                        <img src={vissionImage} alt='no image'></img>
                    </div>
                </div>
                <div className='teamArea' >
                    <h1 style={{ fontWeight: '500', fontSize: '3.1rem' }}>Meet the team</h1>
                    <center>
                        <div className='TeamImgContainer'>
                            <div id='imgCardRow'>
                                <div className='teamImgCard'>
                                    <div className='cardImgHolder'></div>
                                    <h3 id='teamMemberName'>Mohamed Inamul Hussain</h3>
                                    <h4 id='memberRole'>Founder, Mealy</h4>
                                </div>
                                <div className='teamImgCard'>
                                    <div className='cardImgHolder'></div>
                                    <h3 id='teamMemberName'>Krishna</h3>
                                    <h4 id='memberRole'>Senior Program Manager</h4>
                                </div>
                                <div className='teamImgCard'>
                                    <div className='cardImgHolder'></div>
                                    <h3 id='teamMemberName'>Tamilarasan</h3>
                                    <h4 id='memberRole'>Senior Program Manager</h4>
                                </div>
                            </div>
                        </div>
                    </center>

                   
                </div>
                <div className='footerContainer'>
                <footer className="footer1">
                        <div className="waves">
                            <div className="wave" id="wave1"></div>
                            <div className="wave" id="wave2"></div>
                            <div className="wave" id="wave3"></div>
                            <div className="wave" id="wave4"></div>
                        </div>
                        <div className='footContents'>
                        <ul className="social-icon">
                            <li className="social-icon__item">
                                <a className="social-icon__link" href="#">
                                    <ion-icon name="logo-facebook"></ion-icon>
                                </a>
                            </li>
                            <li className="social-icon__item">
                                <a className="social-icon__link" href="#">
                                    <ion-icon name="logo-twitter"></ion-icon>
                                </a>
                            </li>
                            <li className="social-icon__item">
                                <a className="social-icon__link" href="#">
                                    <ion-icon name="logo-linkedin"></ion-icon>
                                </a>
                            </li>
                            <li className="social-icon__item">
                                <a className="social-icon__link" href="#">
                                    <ion-icon name="logo-instagram"></ion-icon>
                                </a>
                            </li>
                        </ul>
                        <ul className="menu">
                            <li className="menu__item">
                                <a className="menu__link" href="#">
                                    Home
                                </a>
                            </li>
                            <li className="menu__item">
                                <a className="menu__link" href="#">
                                    Donate Food
                                </a>
                            </li>
                            <li className="menu__item">
                                <a className="menu__link" href="#">
                                    Volunteer
                                </a>
                            </li>
                            <li className="menu__item">
                                <a className="menu__link" href="#">
                                    Request Food
                                </a>
                            </li>
                            <li className="menu__item">
                                <a className="menu__link" href="#">
                                    About Us
                                </a>
                            </li>
                        </ul>
                        <p id='copyrightText'>&copy;2024 Mealy Foundation | All Rights Reserved</p>
                        </div>

                    </footer>
                    </div>
            </div>
        </>
    )
}
