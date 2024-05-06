
import React from 'react';
import SignUp from './signup';
import Navbar from '../homePage/Navbar';
import Footer from '../homePage/footer';
import LowerFooter from '../homePage/lowerfooter';
import { getCurrentUser } from '../../services/client';
import { User } from '../../models/user';
import AOS from 'aos';
import { useEffect, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import { Box, Typography, Button, Paper, Grid, Link as MuiLink } from '@mui/material';

const SignUpPage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Effect to fetch the current user
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

     // Render different content based on whether a user is logged in or not
    return (
        <>
            {user ? (
                <>
                    <Box display="flex" flexDirection="column" minHeight="100vh">
                        <Navbar user={user}/>
                        <Box flexGrow={1}>
                            <Paper elevation={3} style={{ margin: 30, padding: 20 }}>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item>
                                        <HomeIcon color="primary" style={{ fontSize: 60 }} />
                                    </Grid>
                                    <Grid item xs={12} sm container>
                                        <Grid item xs container direction="column" spacing={2}>
                                            <Grid item xs>
                                                <Typography variant="h4" gutterBottom>
                                                    Welcome Back!
                                                </Typography>
                                                <Typography variant="body1">
                                                    You are already logged in. No need to sign in again. Feel free to navigate to any sections of our application.
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Button variant="contained" color="primary" href="/">
                                                    Go to Home Page
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Box>
                        <Footer />
                        <LowerFooter />
                    </Box>
                </>
            ) : (
                <>
                    <Box>
                        <Navbar />
                        <SignUp />
                        <Footer />
                        <LowerFooter />
                    </Box>
                </>
            )}
        </>
    );
};

export default SignUpPage;
