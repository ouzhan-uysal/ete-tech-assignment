import CustomButton from "../components/custom/Button";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { user, handleLogout } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="container">
      <div className="text-container">
        <h2>{t('user')}: {user?.fullName}</h2>
        <h4>{t('email')}: {user?.email}</h4>
        <CustomButton bgColor="darkgreen" name="LOGOUT" type="button" onClick={handleLogout} />
      </div>
    </div>
  )
}

export default Home;
