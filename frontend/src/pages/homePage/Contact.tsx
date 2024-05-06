import React, { useEffect, useMemo } from 'react';
import './Contact.scss';
import { useTranslation } from 'react-i18next';

// Declaring a global function for initializing the Google Map
declare global {
    interface Window {
      initMap?: () => void;
    }
  }

const Contact: React.FC = () => {
  const upcoming_camp_data = useMemo(() => [
    {
      id: 1,
      c_day: '23rd April 2024, Tuesday',
      c_time: '11:00 AM-7:00 PM',
      c_location: 'Dongolokwa, Congo',
      lat: -4.115292998109669,
      lng: 20.350284629221324,
    },
    {
      id: 2,
      c_day: '23rd April 2024, Tuesday',
      c_time: '11:00 AM-7:00 PM',
      c_location: 'Ocone, Mozambique ',
      lat: -18.078231430649684,
      lng: 36.897225557958315,
    },
    {
      id: 3,
      c_day: '24th April 2024, Wednesday',
      c_time: '11:00 AM-7:00 PM',
      c_location: 'Contamana, Peru',
      lat: -7.282024340983661,
      lng: -74.95744916277557,
    },
    {
      id: 4,
      c_day: '25th April 2024, Thursday',
      c_time: '11:00 AM-7:00 PM',
      c_location: 'Baghramyan, Armenia',
      lat: 40.19701911198368,
      lng: 44.36615857449562,
    },
    {
      id: 5,
      c_day: '26th April 2024,  Friday',
      c_time: '11:00 AM-7:00 PM',
      c_location: 'Matara, Sri Lanka',
      lat: 5.945688263635055,
      lng: 80.5478318411582,
    },
    {
      id: 6,
      c_day: '27th April 2024, Saturday',
      c_time: '11:00 AM-7:00 PM',
      c_location: 'Bontang, Indonesia',
      lat: 0.22863178487764624,
      lng: 117.48333197636994,
    },
  ], []);

   // useEffect hook to initialize the Google Map
  useEffect(() => {
    let map: google.maps.Map;

     // Initializing the map
    function initMap() {
      map = new window.google.maps.Map(document.getElementById("map") as HTMLElement, {
        zoom: 1.9,
        center: new google.maps.LatLng(0, 0),
      })

      upcoming_camp_data.forEach(location => {
        new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map,
          title: location.c_location,
        });
      });
    }

     // Creating a script element for loading the Google Maps API
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCzyo_YIOuET5B1678Y8YTL-u5eRASA0uE&callback=initMap`;
    script.defer = true;
    script.async = true;
    window.initMap = initMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
      delete window.initMap;
    };
  }, [upcoming_camp_data]);

   // useTranslation hook for translating text
  const { t } = useTranslation('common');

   // JSX to render the  section
  return (
    <>
      <div className="contact_section_container" id="contact-us">
        <div className="container_container">
          <div className="google_map_location" >
            <div id="map" className="gmap_iframe" data-aos="zoom-in-left"></div>
          </div>
          <div className="basic_contact_user_form" data-aos="fade-right" data-aos-duration="1500">
            <div className="time_table">
              <h2 style={{ fontFamily: 'Poppins' }}>
                <span>
                  <i className="fa-solid fa-angles-right"></i>
                </span>
                {t('Upcoming Camps')}
              </h2>
            </div>
            <hr />
            {upcoming_camp_data.map((e, index) => (
              <div className="office_timing" key={index}>
                <p className="current_day">{e.c_day}</p>
                <p className="current_day_timing">{e.c_time}</p>
                <p className="clinic_location">{e.c_location}</p>
              </div>
            ))}
            <div className="d_and_c">
              <div className="call_to_office">
                <a href="tel:6176176176">Call Office</a>
                
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Contact;
