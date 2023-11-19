import { useTranslation } from 'react-i18next';
import CustomTab from '../../components/Tabs';
import SigninTab from './tabs/signin';
import SignupTab from './tabs/signup';

const Welcome = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="container signin-container">
      <div className="lang-container">
        {["us", "tr"].map(lng => (
          <img
            src={`/flags/${lng}.svg`}
            alt={`${lng}-flag`}
            key={lng}
            onClick={() => i18n.changeLanguage(lng)}
            style={{
              filter: i18n.resolvedLanguage === lng ? 'unset' : 'grayscale(0.8)'
            }}
          />
        ))}
      </div>
      <CustomTab tabs={[
        {
          label: t('signin'),
          color: "#8DA642",
          children: <SigninTab />,
        },
        {
          label: t('signup'),
          color: "#E42F63",
          children: <SignupTab />,
        }
      ]} />
    </div>
  )
}

export default Welcome;
