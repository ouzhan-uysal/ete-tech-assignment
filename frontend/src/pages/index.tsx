import { useNavigate } from "react-router-dom";
import CustomButton from "../components/custom/Button";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { Col, Row, Table } from "antd";
import { useAppSelector } from "../redux/store";
import { companyTableColumns } from "../constants/tableColumns";


const Home = () => {
  const navigate = useNavigate();
  const { companies } = useAppSelector(state => state.companies);
  const { user, handleLogout } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="container">
      <div className="home-container">
        <h3>{t('user')}: {user?.fullName}</h3>
        <h4>There are <b style={{ color: 'blue' }}>{companies.length}</b> numbers of companies in the system.</h4>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <h5 style={{ marginBottom: '.5rem' }}>Lastly added companies:</h5>
            <Table dataSource={companies.slice(0, 3).map(company => ({
              ...company,
              key: company._id,
            }))} columns={companyTableColumns.filter(col => col.title !== "Delete")} pagination={{ hideOnSinglePage: true }} scroll={{ x: true }} />
          </Col>
          <Col span={12}>
            <CustomButton bgColor="blue" name="Companies" type="button" onClick={() => navigate('/companies')} />
          </Col>
          <Col span={12}>
            <CustomButton bgColor="blue" name="Products" type="button" onClick={() => navigate('/products')} />
          </Col>
          <Col span={24}>
            <CustomButton bgColor="darkred" name="LOGOUT" type="button" onClick={handleLogout} />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Home;
