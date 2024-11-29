import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import AboutUs from './pages/AboutUs.jsx';
import AddApet from './pages/AddAPet.jsx';
import AppinmentStatus from './pages/AppinmentStatus.jsx';
import Blog from './pages/Blog.jsx';
import BookAppoinment from './pages/BookAppoinment.jsx';
import ConfirmAppoinment from './pages/ConfirmAppoinment.jsx';
import ContactUs from './pages/ContactUs.jsx';
import Login from './pages/Login.jsx';
import PetOwnerAppoinmentDashboard from './pages/PetOwnerAppoinmentDashboard.jsx';
import PetOwnerProfile from './pages/PetOwnerProfile.jsx';
import SignUp from './pages/SignUp.jsx';
import Veterinarins from './pages/Veterinarins.jsx';
import VetProfile from './pages/VetProfile.jsx';
import AddVeterinarian from './pages/Addveterinarin.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/addpet" element={<AddApet />} />
        <Route path='/AppoinmentStaus' element={<AppinmentStatus />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/bookappoinment' element={<BookAppoinment />} />
        <Route path='/confirmappoinment' element={<ConfirmAppoinment />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='/login' element={<Login />} />
        <Route path='/PetOwnerAppoinmentDashboard' element={<PetOwnerAppoinmentDashboard />} />
        <Route path='/PetOwnerProfile' element={<PetOwnerProfile />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/Veterinarins' element={<Veterinarins />} />
        <Route path='/VetProfile' element={<VetProfile />} />
        <Route path='/addvet' element={<AddVeterinarian />} />
      
      </Routes>
    </Router>
  </StrictMode>
);
