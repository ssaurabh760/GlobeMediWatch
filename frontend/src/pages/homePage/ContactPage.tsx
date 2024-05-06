import React from 'react';
import { Box } from '@mui/material';
import Contact from './Contact'; 
import Navbar from './Navbar'; 
import Footer from './footer'; 
import LowerFooter from './lowerfooter'; 

// Functional component for the ContactPage
const ContactPage: React.FC = () => {
    return (
        <Box>
            <Navbar />
            <Contact />
            <Footer />
            <LowerFooter />
        </Box>
    );
};

export default ContactPage;
