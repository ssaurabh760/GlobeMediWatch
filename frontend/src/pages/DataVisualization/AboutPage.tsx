import React from 'react';
import Box from '@mui/material/Box'; 
import DataVisualization from './dataVisualization'
import Navbar from '../homePage/Navbar';
import Footer from '../homePage/footer'; 
import LowerFooter from '../homePage/lowerfooter';
import { getCurrentUser } from '../../services/client';
import { User } from '../../models/user';
import AOS from 'aos';
import { useEffect, useState } from 'react';



const ScheduleCampsPage: React.FC = () => {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init({ duration: 600 });
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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {user ? (
                <>
                    <Box>
                        <Navbar user={user}/>
                        <DataVisualization />
                        <Footer></Footer>
                        <LowerFooter></LowerFooter>
                    </Box>
                </>
            ) : (
                <>
                    <Box>
                        <Navbar />
                        <DataVisualization />
                        <Footer></Footer>
                        <LowerFooter></LowerFooter>
                    </Box>
                </>
            )}
        </>
    );


};

export default ScheduleCampsPage;
