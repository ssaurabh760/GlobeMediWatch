import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../../components/shared/Copyright';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { useState } from 'react';
import { signup } from '../../services/client';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { User, ROLES } from '../../models/user';


const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

    // Handling form submission
const handleSubmit = async (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);

   // Get user details from form data
  const userDetails = {
    firstname: data.get('firstName'),
    lastname: data.get('lastName'),
    email: data.get('email'),
    password: data.get('password'),
    role: data.get('role'),
  };

  // Depending on the role, submit different details
  if (userDetails.role === 'organization') {
    const orgDetails = {
      ...userDetails,
      organizationName,
      description,
      location,
    };

    try {
      const response = await axios.post('http://localhost:3000/healthorgs', orgDetails);
      console.log('Signup successful', response);
      navigate('/signin');
    } catch (error) {
      handleSignupError(error);
    }
  } else if (userDetails.role === 'volunteer') {
    const volunteerDetails = {
      ...userDetails,
      expertise: ' ', 
    };

    try {
      const response = await axios.post('http://localhost:3000/volunteers', volunteerDetails);
      console.log('Signup successful', response);
      navigate('/signin');
    } catch (error) {
      handleSignupError(error);
    }
  } else {
    try {
      const response = await axios.post('http://localhost:3000/users/signup', userDetails);
      console.log('Signup successful', response);
      navigate('/signin');
    } catch (error) {
      handleSignupError(error);
    }
  }
};

// Handle signup errors
  const handleSignupError = (error) => {
    const axiosError = error as AxiosError<{ message: string }>;
    const errorMessage = axiosError.response?.data?.message ?? 'An unknown error occurred';
    setError(`Signup failed: ${errorMessage}`);
  };

    // Handle role change
  const handleRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };

    // Handle organization name change
  const handleOrganizationNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrganizationName(event.target.value);
  };

  // Handle description change
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

   // Handle location change
  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

// JSX to render
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" data-aos="fade-up">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">Sign up</Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField autoComplete="given-name" name="firstName" required fullWidth id="firstName" label="First Name" autoFocus />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="family-name" />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" />
              </Grid>
              <Grid item xs={12}>
                <FormControl required fullWidth>
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select name="role" labelId="role-label" id="role" value={role} label="Role" onChange={handleRoleChange}>
                    <MenuItem value="general">General</MenuItem>
                    <MenuItem value="organization">Organization</MenuItem>
                    <MenuItem value="volunteer">Volunteer</MenuItem>
                  </Select>
                  <FormHelperText>Please select your role</FormHelperText>
                </FormControl>
              </Grid>
              {role === 'organization' && (
                <>
                  <Grid item xs={12}>
                    <TextField required fullWidth id="organizationName" label="Organization Name" name="organizationName" value={organizationName} onChange={handleOrganizationNameChange} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField required fullWidth id="description" label="Description" name="description" value={description} onChange={handleDescriptionChange} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField required fullWidth id="location" label="Location" name="location" value={location} onChange={handleLocationChange} />
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <FormControlLabel control={<Checkbox value="allowExtraEmails" color="primary" />} label="I want to receive inspiration and updates via email." />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign Up</Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </ThemeProvider>
  );
}