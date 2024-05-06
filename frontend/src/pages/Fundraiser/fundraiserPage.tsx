/**
 * This file represents the Fundraiser Page component.
 * It renders the Fundraiser component along with the Navbar, Footer, and LowerFooter components.
 * The Fundraiser Page is only accessible to users with the role of "ORGANIZATION".
 * 
 * @file This file defines the Fundraiser Page component.
 * @module FundraiserPage
 */

import React from 'react';
import Box from '@mui/material/Box'; 
import Fundraiser from './fundraiser'
import Navbar from '../homePage/Navbar';
import Footer from '../homePage/footer'; 
import LowerFooter from '../homePage/lowerfooter';
import AuthWrapper from '../../services/AuthWrapper';
import { ROLES, User } from '../../models/user';

/**
 * The Fundraiser Page component.
 * 
 * @component
 * @returns {JSX.Element} The Fundraiser Page component.
 */
const FundraiserPage: React.FC = () => {
    return (
        <AuthWrapper allowedRoles={[ROLES.ORGANIZATION.toString()]}>
           {(user: User) => (
            <Box display="flex" flexDirection="column" minHeight="100vh"> 
                <Navbar user={user}/>
                <Box flexGrow={1}>
                <Fundraiser healthOrgId={user._id}/>
                </Box>
                <Footer></Footer>
                <LowerFooter></LowerFooter>
            </Box>
            )}
        </AuthWrapper>
    );
};

export default FundraiserPage;
