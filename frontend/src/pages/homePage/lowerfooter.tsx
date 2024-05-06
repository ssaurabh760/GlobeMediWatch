/**
 * Component for rendering the copyright footer.
 */
import { FC } from "react";
import './lowerfooter.scss';
import { useTranslation } from 'react-i18next';

/**
 * CopyrightFooter component.
 */
const CopyrightFooter: FC = () => {
  const { t } = useTranslation('common');
  return (
    <div className="copyright_footer">
      <p>
        <span>
          {/* <i className="fa-regular fa-copyright"></i> */}
          <span>&copy;</span>
        </span>
        2024
        <a href="/" id="clinic_name">
          {t('appbar.title.label')}
        </a>
        {t('lowerfooter')}
      </p>
    </div>
  );
};

export default CopyrightFooter;
