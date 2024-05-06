/**
* Home component
* Represents the home page of the application
*/
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import HeroSection from '../../components/Home/HeroSection';
import ServicesSection from '../../components/Home/ServicesSection';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from '../../pages/homePage/footer';
import LowerFooter from '../../pages/homePage/lowerfooter';
import Contact from '../../pages/homePage/Contact';
import Services from '../../pages/homePage/services';
import About from '../../pages/homePage/About';
import Navbar from './Navbar';
import { getCurrentUser } from '../../services/client';
import { User } from '../../models/user';

/**
* Styled component for the home container
*/
const HomeContainer = styled(Box)(({ theme }) => ({
 paddingBottom: 10,
 backgroundColor: theme.palette.background.default,
}));

/**
* Home component
* @returns {JSX.Element} The rendered Home component
*/
const Home: React.FC = () => {
 /**
  * State variable to store the user object
  */
 const [user, setUser] = useState<User | null>(null);

 /**
  * State variable to indicate if the user data is being loaded
  */
 const [loading, setLoading] = useState(true);

 /**
  * useEffect hook to initialize AOS and fetch the user data
  */
 useEffect(() => {
   setTimeout(() => {
     AOS.init({ duration: 600 });
     setTimeout(() => {
       AOS.refresh();
     }, 100);
   }, 100);

   /**
    * Fetches the current user data
    */
   const fetchUser = async () => {
     try {
       const currentUser = await getCurrentUser();
       setUser(currentUser);
     } catch (error) {
       console.error('Error fetching user:', error);
     }
     setLoading(false);
   };

   fetchUser();
 }, []);

 /**
  * Renders a loading state while the user data is being fetched
  */
 if (loading) {
   return <div>Loading...</div>;
 }

 return (
   <HomeContainer>
     {user ? (
       <>
         <Navbar user={user} />
         <HeroSection />
         <ServicesSection />
         <About />
         <Services />
         <Contact />
         <Footer />
         <LowerFooter />
       </>
     ) : (
       <>
         <Navbar />
         <HeroSection />
         <ServicesSection />
         <About />
         <Services />
         <Contact />
         <Footer />
         <LowerFooter />
       </>
     )}
   </HomeContainer>
 );
};

export default Home;