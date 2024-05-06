/**
* CampServicesTestPage component
* Represents the page for managing services
*/
import React from 'react';
import { Box } from '@mui/material';
import ManageServices from './ManageServices';
import Navbar from '../homePage/Navbar';
import Footer from '../homePage/footer';
import LowerFooter from '../homePage/lowerfooter';
import AuthWrapper from '../../services/AuthWrapper';
import { ROLES, User } from '../../models/user';

/**
* CampServicesTestPage component
* @returns {JSX.Element} - The rendered CampServicesTestPage component
*/
const CampServicesTestPage: React.FC = () => {
 return (
   <AuthWrapper allowedRoles={[ROLES.ORGANIZATION.toString()]}>
     {(user: User) => (
       <Box>
         <Navbar user={user} />
         <ManageServices healthOrgId={user._id} />
         <Footer />
         <LowerFooter />
       </Box>
     )}
   </AuthWrapper>
 );
};

export default CampServicesTestPage;