/**
 * Button component
 * Renders a customized button with a link
 */
import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { Button as MuiButton, Link } from '@mui/material';
import { styled } from '@mui/system';

/**
 * ButtonProps interface
 * Defines the props for the Button component
 */
interface ButtonProps {
  to: string;
  className?: string;
  children: React.ReactNode;
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
}

/**
 * Styled component for the button
 * Customizes the appearance of the button
 */
const StyledButton = styled(MuiButton)(({ theme }) => ({
  display: 'inline-block',
  padding: '12px 24px',
  fontSize: 16,
  color: theme.palette.common.white,
  backgroundColor: 'transparent',
  border: `2px solid ${theme.palette.common.white}`,
  borderRadius: 25,
  textDecoration: 'none',
  transition: 'background-color 0.3s ease, color 0.3s ease',
  marginTop: 'auto',
  '&:hover': {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.dark,
  },
}));

/**
 * Button component
 * Renders a button with a link to the specified route
 * @param {ButtonProps} props - The props for the Button component
 * @param {string} props.to - The route to link to
 * @param {string} [props.className] - Additional CSS class name for the button
 * @param {React.ReactNode} props.children - The content of the button
 * @param {string} [props.variant='contained'] - The variant of the button (text, outlined, or contained)
 * @param {string} [props.color='primary'] - The color of the button
 */
const Button: React.FC<ButtonProps> = ({
  to,
  className,
  children,
  variant = 'contained',
  color = 'primary',
}) => {
  return (
    <Link component={HashLink} to={to}>
      <StyledButton className={className} variant={variant} color={color}>
        {children}
      </StyledButton>
    </Link>
  );
};

export default Button;