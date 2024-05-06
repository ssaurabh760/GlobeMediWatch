/**
 * ServicesSection component
 * Displays a section with service cards
 */
import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';
import Button from '../shared/Button';
import { useTranslation } from 'react-i18next';

/**
 * Styled component for the services container
 * Sets background color, border radius, and padding
 */
const ServicesContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 15,
  padding: '50px 100px',
}));

/**
 * Styled component for the services grid
 * Displays service cards in a grid layout
 */
const ServicesGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
}));

/**
 * Styled component for the service card
 * Sets display properties, color, padding, border radius, and hover effect
 */
const ServiceCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: theme.palette.common.white,
  padding: '40px',
  borderRadius: 15,
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.5s ease-in-out',
  '&:hover': {
    transform: 'translateY(-10px)',
  },
}));

/**
 * Styled components for individual service cards
 * Sets background color for each card
 */
const ServiceCard01 = styled(ServiceCard)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
}));

const ServiceCard02 = styled(ServiceCard)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

const ServiceCard03 = styled(ServiceCard)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
}));

/**
 * Styled component for the service title
 * Sets font size, margin, text alignment, font family, and color
 */
const ServiceTitle = styled(Typography)(({ theme }) => ({
  fontSize: '28px !important',
  marginBottom: '20px !important',
  textAlign: 'center',
  fontFamily: 'inherit !important',
  color: `${theme.palette.common.white} !important`,
}));

/**
 * Styled component for the service description
 * Sets font size, line height, margin, text alignment, and font family
 */
const ServiceDescription = styled(Typography)(({ theme }) => ({
  fontSize: '18px !important',
  lineHeight: '1.6 !important',
  marginBottom: '30px !important',
  textAlign: 'center',
  flexGrow: 1,
  fontFamily: 'inherit !important',
}));

/**
 * Styled component for the service button
 * Sets padding, font size, color, background color, border, border radius, and hover effect
 */
const ServiceButton = styled(Button)(({ theme }) => ({
  display: 'inline-block',
  padding: '12px 24px',
  fontSize: '16px !important',
  color: `${theme.palette.common.white} !important`,
  backgroundColor: 'transparent !important',
  border: `2px solid ${theme.palette.common.white} !important`,
  borderRadius: '25px !important',
  textDecoration: 'none',
  transition: 'background-color 0.3s ease, color 0.3s ease',
  marginTop: 'auto',
  '&:hover': {
    backgroundColor: `${theme.palette.common.white} !important`,
    color: '#1a237e !important',
  },
}));

/**
 * ServicesSection component
 * Renders a section with service cards
 * Uses react-i18next for internationalization
 */
const ServicesSection: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <ServicesContainer>
      <ServicesGrid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <ServiceCard01 data-aos="fade-up">
            <ServiceTitle variant="h2">{t('card1.title')}</ServiceTitle>
            <ServiceDescription>{t('card1.content')}</ServiceDescription>
            <ServiceButton to="/signin" variant="contained" color="primary">
              {t('card1.button')}
            </ServiceButton>
          </ServiceCard01>
        </Grid>
        <Grid item xs={12} sm={4}>
          <ServiceCard02 data-aos="fade-up" data-aos-delay="200">
            <ServiceTitle variant="h2">{t('card2.title')}</ServiceTitle>
            <ServiceDescription>{t('card2.content')}</ServiceDescription>
            <ServiceButton to="/#contact-us" variant="contained" color="primary">
              {t('card2.button')}
            </ServiceButton>
          </ServiceCard02>
        </Grid>
        <Grid item xs={12} sm={4}>
          <ServiceCard03 data-aos="fade-up" data-aos-delay="400">
            <ServiceTitle variant="h2">{t('card3.title')}</ServiceTitle>
            <ServiceDescription>{t('card3.content')}</ServiceDescription>
            <ServiceButton
              to="/#our-services"
              variant="contained"
              color="primary"
              className="btn-explore-features"
            >
              {t('card3.button')}
            </ServiceButton>
          </ServiceCard03>
        </Grid>
      </ServicesGrid>
    </ServicesContainer>
  );
};

export default ServicesSection;