import ServiceData from "./serviceData.tsx"
import "./services.scss";
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t } = useTranslation('common');// For internationalization
  return (
    <>
      <section id="our-services">
        <div className="services_container">
          <h2 className="services_header">
            <span>
              <i className="fas fa-angle-right"></i>
            </span>
            {t('home.ourservices')}
          </h2>
          <div className="service_info_container">
            {ServiceData.map((e, index) => (
              <div
                className="service_info"
                key={index}
                data-aos="fade-right"
                data-aos-duration="1000"
              >
                <img
                  className="service_image_details"
                  src={e.img_src}
                  alt="gmw service logo"
                />
                {/* <h2 className="service__title">{e.title}</h2> */}
                <h3 className="service_detail_info">{e.description}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
