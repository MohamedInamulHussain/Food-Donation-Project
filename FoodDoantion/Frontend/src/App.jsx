import { AboutUs } from './AboutUs/AboutUs'
import './App.css'
import { DonatorPage } from './DonatorPage/DonatorPage'
import { FoodRequest } from './FoodRequestPage/FoodRequest'
import { Home } from './Home/Home'
import { Nav } from './Nav/Nav'
import { Volunteer } from './Volunteer/Volunteer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Testing } from './Testing'
import { Login } from './LoginPage/Login'
import { VolunteerLogin } from './VolunteerLogin/VolunteerLogin'
import { Signup } from './LoginPage/Signup'
import { VolunteerSignup } from './VolunteerLogin/VolunteerSignup'
function App() {
 
  return (
    <>
    
    <Router>
    <Nav/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/DonatorPage" element={<DonatorPage/>}/>
        <Route path="/volunteer-login" element={<VolunteerLogin/>}/>
        <Route path="/volunteer-signup" element={<VolunteerSignup/>}/>
        <Route path="/Volunteer" element={<Volunteer/>}/>
        <Route path="/Food Request" element={<FoodRequest/>}/>
        <Route path="/About Us" element={<AboutUs/>}/>
      </Routes>
    </Router>
      
      {/* <Testing/> */}
      {/* <Login/> */}
      {/* <Signup/> */}
    </>
  )
}

export default App
