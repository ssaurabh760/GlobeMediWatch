/**
* CampServicesTestPage component
* Represents the page for managing camp services
*/
import React from 'react';
import { Box } from '@mui/material';
import ManageCampServices from './ManageCampServices';
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
       <Box display="flex" flexDirection="column" minHeight="100vh">
         <Navbar user={user} />
         <Box flexGrow={1}>
           <ManageCampServices healthOrgId={user._id} />
         </Box>
         <Footer />
         <LowerFooter />
       </Box>
     )}
   </AuthWrapper>
 );
};

export default CampServicesTestPage;