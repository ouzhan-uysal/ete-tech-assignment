import { useNavigate } from "react-router-dom";
import CustomButton from "../components/custom/Button";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { Col, Row } from "antd";


const Home = () => {
  const navigate = useNavigate();
  const { user, handleLogout } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="container">
      <div className="home-container">
        <h2>{t('user')}: {user?.fullName}</h2>
        <h4>{t('email')}: {user?.email}</h4>
        <Row gutter={[24, 24]} >
          <Col span={12}>
            <CustomButton bgColor="darkgreen" name="Companies" type="button" onClick={() => navigate('/companies')} />
          </Col>
          <Col span={12}>
            <CustomButton bgColor="darkgreen" name="Products" type="button" onClick={() => navigate('/products')} />
          </Col>
          <Col span={24}>
            <CustomButton bgColor="darkgreen" name="LOGOUT" type="button" onClick={handleLogout} />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Home;
