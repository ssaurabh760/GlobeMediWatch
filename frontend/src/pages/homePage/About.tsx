import "./About.css";
import about_img from "../../assets/Images/newAboutUs.jpeg";// Image for the about section
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation('common');// For internationalization
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
            {t('home.aboutus')}
          </h2>
          <div className="about_container">
            <div className="about_infos">
              <p className="about_short_descrp">
              {t('home.aboutus.title')}
              </p>
              <p className="about_long_descrp">
                {t('home.aboutus.content')}
</p>
              <div className="about_align_btn">
                <a href="/about">
                  <button className="more_info_btn">{t('home.aboutus.button')}</button>
                  </a>
                
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
