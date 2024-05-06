import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/homePage/home';
import LoginPage from './pages/Login/loginPage';
import SignUpPage from './pages/signUp/signupPage';
import ContactPage from './pages/homePage/ContactPage';
import ManageServicesPage from './pages/Service/ManageServicesPage';
import ManagePatientRecordsPage from './pages/PatientRecords/ManagePatientRecordsPage';
import ManageCampServicesPage from './pages/Service/ManageCampServicesPage';
import ViewCampByHealthOrgsPage from './pages/Camps/ViewCampsByHealthOrgsPage';
import ViewCampByUsers from './pages/Camps/ViewCampsByUsersPage';
import VolunteerRegisteredCamps from './pages/Volunteers/ViewRegisteredCampsPage';
import VolunteerFormPage from './pages/Volunteers/volunteersFormPage';
import DonatePage from './pages/Fundraiser/donatePage';
import FundraiserPage from './pages/Fundraiser/fundraiserPage';
import ScheduleCampsPage from './pages/Camps/ScheduleCampsPage';
import HealthCampCardsPage from './pages/Volunteers/HealthCampListVolunteerPage';
import CampAttendanceReport from './pages/Camps/CampAttendanceReportPage';
// import VolunteerForm from './pages/Volunteers/volunteersForm';
import Success from './pages/Fundraiser/success';
import About from './pages/DataVisualization/AboutPage';
// import UserProfile from "./pages/UserProfile/userprofile";
import UserProfilePage from "./pages/UserProfile/userProfilePage";



const App: React.FC = () => {
  return (
            
            <Router>
            <Routes> 
                <Route path="/" element={<Home />} />
                <Route path="/manage-services" element={<ManageServicesPage/>} />
                <Route path="/manage-patient-records" element={<ManagePatientRecordsPage/>} />
                <Route path="/manage-camp-services" element={<ManageCampServicesPage/>} />
                <Route path="/schedule-camps" element={<ScheduleCampsPage/>} />
                <Route path="/camp_by_healthorgs" element={<ViewCampByHealthOrgsPage/>} />
                <Route path="/camp_list" element={<HealthCampCardsPage/>} />
                <Route path="/volunteer-form/:campId" element={<VolunteerFormPage/>} />
                <Route path="/signin" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/fundraiser" element={<DonatePage />} />

                
                

                
                <Route path="/volunteer-registered-camps" element={<VolunteerRegisteredCamps />} />

                <Route path="/fundraiser/success" element={<Success />} />
                <Route path="/fundraisers" element={<FundraiserPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/camp-dashboard" element={<CampAttendanceReport />} />
                <Route path="/upcoming-camps" element={<ViewCampByUsers />} />
                <Route path="/profile" element={<UserProfilePage />} />

            </Routes>
            </Router>
  );
};

export default App;
