/**
* PatientRecordsPage component
* Represents the page for managing patient records
*/
import React from 'react';
import { Box } from '@mui/material';
import ManagePatientRecords from './ManagePatientRecords';
import Navbar from '../homePage/Navbar';
import Footer from '../homePage/footer';
import LowerFooter from '../homePage/lowerfooter';
import AuthWrapper from '../../services/AuthWrapper';
import { ROLES, User } from '../../models/user';

/**
* PatientRecordsPage component
* @returns {JSX.Element} - The rendered PatientRecordsPage component
*/
const PatientRecordsPage: React.FC = () => {
 return (
   <AuthWrapper allowedRoles={[ROLES.ORGANIZATION.toString()]}>
     {(user: User) => (
       <Box display="flex" flexDirection="column" minHeight="100vh">
         <Navbar user={user} />
         <Box flexGrow={1}>
           <ManagePatientRecords healthOrgId={user._id} />
         </Box>
         <Footer />
         <LowerFooter />
       </Box>
     )}
   </AuthWrapper>
 );
};

export default PatientRecordsPage;