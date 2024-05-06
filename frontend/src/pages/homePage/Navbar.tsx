/**
* Navbar component
* Represents the navigation bar of the application
*/
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Images/loader.gif';
import './Navbar.css';
import { ROLES, User } from '../../models/user';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

/**
* Props for the Navbar component
*/
interface NavbarProps {
 user?: User;
}

/**
* Navbar component
* @param {NavbarProps} props - The props for the Navbar component
* @returns {JSX.Element} - The rendered Navbar component
*/
const Navbar = ({ user }: NavbarProps) => {
 /**
  * State variable to control the visibility of the menu
  */
 const [isMenuOpen, setMenuOpen] = useState(false);

 /**
  * State variable to control the visibility of the dropdown
  */
 const [isDropdownOpen, setDropdownOpen] = useState(false);

 /**
  * Translation hook to access localized strings
  */
 const { t } = useTranslation('common');

 /**
  * Changes the language of the application
  * @param {string} language - The language code to change to
  */
 const changeLanguage = (language: string) => {
   i18n.changeLanguage(language);
 };

 /**
  * Toggles the visibility of the menu
  */
 const toggleMenu = () => {
   setMenuOpen(!isMenuOpen);
   if (isMenuOpen) {
     setDropdownOpen(false);  // Automatically close dropdown when the menu is closed
   }
 };

 /**
  * Toggles the visibility of the dropdown
  */
 const toggleDropdown = () => {
   setDropdownOpen(!isDropdownOpen);
 };

 /**
  * Closes the menu and the dropdown
  */
 const closeMenu = () => {
   setMenuOpen(false);
   setDropdownOpen(false);
 };

 /**
  * Logs out the user by removing the token from local storage and redirecting to the home page
  */
 const logout = () => {
   localStorage.removeItem('token');
   window.location.href = '/';
 };

 return (
   <nav className="navbar" data-aos="fade" data-aos-duration="400">
     <div className="navbar-logo">
       <Link to="/" onClick={closeMenu}>
         <img src={logo} alt="GlobeMediWatch logo" />
       </Link>
       <h2>{t('appbar.title.label')}</h2>
     </div>
     <div className='language-toggle'>
       <ToggleButtonGroup
         value={i18n.language}
         exclusive
         onChange={(event, newValue) => {
           if (newValue !== null) {
             changeLanguage(newValue);
           }
         }}
       >
         <ToggleButton value="en" aria-label="English">
           {t('English')}
         </ToggleButton>
         <ToggleButton value="ta" aria-label="Tamil">
           {t('தமிழ்')}
         </ToggleButton>
       </ToggleButtonGroup>
     </div>
     <div className={`navbar-links ${isMenuOpen ? 'navbar-menu' : ''}`}>
       <div className="navbar-item">
         <Link to="/" onClick={closeMenu}>{t('navbar.home.label')}</Link>
       </div>
       <div className="navbar-item">
         <Link to="/fundraiser" onClick={closeMenu}>{t('navbar.donate.label')}</Link>
       </div>
       {user && (
         <>
           {user.role === ROLES.ORGANIZATION.toString() && (
             <>
               <div className="navbar-item dropdown">
                 <button onClick={toggleDropdown} className="dropbtn">{t('footer.healthcamps')}</button>
                 {isDropdownOpen && (
                   <div className="dropdown-content">
                     {user.role === ROLES.ORGANIZATION.toString() && (
                       <>
                         <Link to="/schedule-camps" onClick={closeMenu}>{t('navbar.schedulecamp.label')}</Link>
                         <Link to="/camp_by_healthorgs" onClick={closeMenu}>{t('navbar.editcamp.label')}</Link>
                         <Link to="/manage-camp-services" onClick={closeMenu}>{t('navbar.managecampservices.label')}</Link>
                         <Link to="/camp-dashboard" onClick={closeMenu}>{t('navbar.campdashboard.label')}</Link>
                       </>
                     )}
                   </div>
                 )}
               </div>
               <div className="navbar-item">
                 <Link to="/manage-patient-records" onClick={closeMenu}>{t('navbar.patient.label')}</Link>
               </div>
               <div className="navbar-item">
                 <Link to="/manage-services" onClick={closeMenu}>{t('navbar.services.label')}</Link>
               </div>
               <div className="navbar-item">
                 <Link to="/fundraisers" onClick={closeMenu}>{t('navbar.fundraisers')}</Link>
               </div>
             </>
           )}
           {user.role === ROLES.VOLUNTEER.toString() && (
             <>
               <div className="navbar-item">
                 <Link to="/camp_list" onClick={closeMenu}>{t('navbar.joincamps.label')}</Link>
               </div>
               <div className="navbar-item">
                 <Link to="/volunteer-registered-camps" onClick={closeMenu}>{t('navbar.viewregisteredcamps.label')}</Link>
               </div>
             </>
           )}
           <div className="navbar-item">
             <Link to="/profile" onClick={closeMenu}>{t('navbar.profile')}</Link>
           </div>
           <div className="navbar-item">
             <Link to="/" onClick={logout}>{t('navbar.logout')}</Link>
           </div>
         </>
       )}
       {!user && (
         <>
           <div className="navbar-item">
             <Link to="/about" onClick={closeMenu}>{t('navbar.about.label')}</Link>
           </div>
           <div className="navbar-item">
             <Link to="/upcoming-camps" onClick={closeMenu}>{t('navbar.viewcamp.label')}</Link>
           </div>
           <div className="navbar-item">
             <Link to="/signin" onClick={closeMenu}>{t('navbar.login.label')}</Link>
           </div>
         </>
       )}
     </div>
     <div className="navbar-toggle" onClick={toggleMenu}>
       <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
     </div>
   </nav>
 );
};

export default Navbar;