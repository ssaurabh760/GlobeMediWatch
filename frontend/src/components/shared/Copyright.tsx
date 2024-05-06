/**
* Copyright component
* Displays the copyright information with a link to the website
*/
import Typography, { TypographyProps } from '@mui/material/Typography';
import Link from '@mui/material/Link';

/**
* CopyrightProps interface
* Extends the TypographyProps interface
*/
interface CopyrightProps extends TypographyProps {}

/**
* Copyright component
* @param {CopyrightProps} props - The props for the Copyright component
* @returns {JSX.Element} - The rendered Copyright component
*/
function Copyright(props: CopyrightProps) {
 return (
   <Typography variant="body2" color="text.secondary" align="center" {...props}>
     {'Copyright © '}
     <Link color="inherit" href="/">
       GlobeMediWatch
     </Link>{' '}
     {new Date().getFullYear()}
     {'.'}
   </Typography>
 );
}

export default Copyright;