/**
 * HeroSection component
 * Displays a hero section with title, description, and an image
 */
import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import heroImage from '../../assets/Images/slide_one.png';
import { useTranslation } from 'react-i18next';

/**
 * Styled component for the hero container
 * Displays content in a flex layout and adjusts for smaller screens
 */
const HeroContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '90%',
  margin: '0 auto',
  padding: '50px 0',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
}));

/**
 * Styled component for the hero content
 * Sets a max width and adjusts for smaller screens
 */
const HeroContent = styled(Box)(({ theme }) => ({
  maxWidth: 600,
  textAlign: 'left',
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    marginBottom: 40,
  },
}));

/**
 * Styled component for the hero title
 * Sets font size, weight, color, and adjusts for smaller screens
 */
const HeroTitle = styled(Typography)(({ theme }) => ({
  fontSize: 48,
  fontWeight: 'bold',
  marginBottom: 20,
  color: theme.palette.primary.dark,
  [theme.breakpoints.down('sm')]: {
    fontSize: 36,
  },
}));

/**
 * Styled component for the hero description
 * Sets font size, line height, color, and adjusts for smaller screens
 */
const HeroDescription = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  lineHeight: 1.5,
  marginBottom: 40,
  color: theme.palette.text.primary,
  [theme.breakpoints.down('sm')]: {
    fontSize: 18,
  },
}));

/**
 * Styled component for the hero image container
 * Sets flex properties and adjusts for smaller screens
 */
const HeroImageContainer = styled(Box)(({ theme }) => ({
  flex: '0 0 50%',
  textAlign: 'right',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    flex: '0 0 100%',
    textAlign: 'center',
  },
}));

/**
 * Styled component for the hero image
 * Sets max width, height, and border radius
 */
const HeroImage = styled('img')(({ theme }) => ({
  maxWidth: '100%',
  height: 'auto',
  borderRadius: 10,
}));

/**
 * HeroSection component
 * Renders the hero section with title, description, and image
 * Uses react-i18next for internationalization
 */
const HeroSection: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <HeroContainer>
      <HeroContent>
        <HeroTitle variant="h2" data-aos="fade-right">
          {t('content.title')}.
        </HeroTitle>
        <HeroDescription data-aos="fade-up-right">
          {t('content.content')}
        </HeroDescription>
      </HeroContent>
      <HeroImageContainer data-aos="slide-down">
        <HeroImage src={heroImage} alt="Hero" />
      </HeroImageContainer>
    </HeroContainer>
  );
};

export default HeroSection;