/**
 * Footer component for the home page.
 * Renders the footer section with contact information and social media links.
 */
import { FC } from "react";
import Typography from "@mui/material/Typography";
import './footer.scss';
import { SocialIcon } from 'react-social-icons';
import { useTranslation } from 'react-i18next'; 

const Footer: FC = () => {
  const { t } = useTranslation('common');
  return (
    <footer className="footer">
      <div className="footer-split">            
        <div className="footer-left">
          <div className="footer__addr">
            <Typography variant="subtitle1" sx={{ letterSpacing: 1, mb: 2, fontSize: 20, fontWeight: 'bold', color: 'white' }}>
              {t('footer.content')}
            </Typography>
            <Typography variant="subtitle1" sx={{ letterSpacing: 1, fontSize: 20, fontWeight: 'bold', color: 'white' }}>
              {t('footer.content.label')}
            </Typography>
            <address>
              70 Forsyth St, Boston, MA 02115 <br />
              8574659358
              <a className="footer__btn" href="mailto:globemediwatch@gmail.com">{t('Email')}</a>
            </address>
          </div>
        </div>
        <div className="footer-right">
          <ul className="social-icon">
            <li className="social-icon__item"><a className="social-icon__link" href="#">
              <SocialIcon url="https://linkedin.com/" />
            </a></li>
            <li className="social-icon__item"><a className="social-icon__link" href="#">
              <SocialIcon url="https://x.com/" />
            </a></li>
            <li className="social-icon__item"><a className="social-icon__link" href="#">
              <SocialIcon url="https://facebook.com/" />
            </a></li>
            <li className="social-icon__item"><a className="social-icon__link" href="#">
              <SocialIcon url="https://instagram.com/" />
            </a></li>
          </ul>
          <ul className="menuu">
            <li className="menu__item"><a className="menu__link" href="/">{t('navbar.home.label')}</a></li>
            <li className="menu__item"><a className="menu__link" href="about">{t('navbar.about.label')}</a></li>
            <li className="menu__item"><a className="menu__link" href="signin">{t('navbar.login.label')}</a></li>
            <li className="menu__item"><a className="menu__link" href="/upcoming-camps">{t('footer.healthcamps')}</a></li>
            <li className="menu__item"><a className="menu__link" href="fundraiser">{t('navbar.donate.label')}</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
