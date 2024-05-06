/**
 * CampAttendanceReportPage component
 * Renders the CampAttendanceReport component within an authenticated wrapper
 */
import React from 'react';
import { Box } from '@mui/material';
import CampAttendanceReport from './CampAttendanceReport';
import Navbar from '../homePage/Navbar';
import Footer from '../homePage/footer';
import LowerFooter from '../homePage/lowerfooter';
import AuthWrapper from '../../services/AuthWrapper';
import { ROLES, User } from '../../models/user';

/**
 * CampAttendanceReportPage component
 * @returns {JSX.Element} Rendered component
 */
const CampAttendanceReportPage: React.FC = () => {
    return (
        <AuthWrapper allowedRoles={[ROLES.ORGANIZATION.toString()]}>
            {(user: User) => (
                <Box display="flex" flexDirection="column" minHeight="100vh">
                    <Navbar user={user} />
                    <Box flexGrow={1}>
                        <CampAttendanceReport healthOrgId={user._id} />
                    </Box>
                    <Footer />
                    <LowerFooter />
                </Box>
            )}
        </AuthWrapper>
    );
};

export default CampAttendanceReportPage;