import "./about.scss";
import about_img from "../../assets/Images/donate.png";
import Navbar from "../homePage/Navbar";
import { useTranslation } from 'react-i18next'; 

/**
 * Represents the About component.
 * This component displays information about the application.
 */
const About = () => {
  const { t } = useTranslation('common');
  return (
    <>
      <div
        style={{ backgroundColor: "#fff" }}
        id="about-doctors"
      >
        <div className="about_section_container">
          <h2 className="about_title">
            <span className="about_title_logo">
              <i className="fas fa-angle-right"></i>
            </span>
            {t('about.welcome')}
          </h2>
          <div className="about_container">
            <div className="about_infos">
              <p className="about_short_descrp">
                {t('about.welcome.title')}
              </p>
              <p className="about_long_descrp">{t('about.welcome.content')}
                <br />
                {t('about.welcome.content2')}
              </p>
              <div className="about_align_btn">
                <p> {t('about.welcome.content3')}</p>
              </div>
            </div>
            <div className="about_image">
              <img src={about_img} alt="about img" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
