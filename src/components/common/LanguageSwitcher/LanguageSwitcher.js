import { useTranslation } from 'react-i18next';
import s from './LanguageSwitcher.module.css';
import ukFlagIcon from '../../../images/ukFlagIcon.png';
import ukrFlagIcon from '../../../images/ukrFlagIcon.png';
import ruFlagIcon from '../../../images/ruFlagIcon.png';

const languages = {
  uk: { icon: ukrFlagIcon, nativeName: 'Українська' },
  en: { icon: ukFlagIcon, nativeName: 'English' },
  ru: { icon: ruFlagIcon, nativeName: 'русский' },
};

const LanguageSwitcher = props => {
  const { i18n } = useTranslation();

  return (
    <div className={s.switcher}>
      {Object.keys(languages).map(lng => (
        <div key={lng} className={s.btnWrapper}>
          <button
            className={
              i18n.language === lng ? `${s.button} ${s.active}` : s.button
            }
            type="submit"
            onClick={() => i18n.changeLanguage(lng)}
          >
            <img
              className={s.img}
              src={languages[lng].icon}
              alt={languages[lng].nativeName}
            />
          </button>
        </div>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
