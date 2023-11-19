import CustomButton from '../../components/custom/Button';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Input, Modal, Row, Table } from 'antd';
import { useEffect, useState } from 'react';
import useApollo from '../../hooks/useApollo';

const columns = [
  {
    title: 'Company Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Legal Number',
    dataIndex: 'legalNo',
    key: 'legalNo',
  },
  {
    title: 'Incorporation Country',
    dataIndex: 'incorporation',
    key: 'incorporation',
  },
  {
    title: 'Website',
    dataIndex: 'website',
    key: 'website',
  },
  {
    title: 'Edit',
    dataIndex: 'edit',
    key: 'edit',
  },
  {
    title: 'Delete',
    dataIndex: 'delete',
    key: 'delete',
  },
];

const Companies = () => {
  const navigate = useNavigate();
  const { QueryRequest } = useApollo();
  const [modal, setModal] = useState<{
    show: boolean;
    loading: boolean;
  }>({ show: false, loading: false });
  const [search, setSearch] = useState<string>('');
  const [data, setData] = useState<Array<{
    key: string;
    name: string;
    legalNo: number;
    incorporation: string;
    website: string;
    edit: JSX.Element;
    delete: JSX.Element;
  }>>([
    {
      key: '1',
      name: 'OPS',
      legalNo: 32,
      incorporation: 'Isparta',
      website: 'https://www.ops.com',
      edit: <Button>Edit</Button>,
      delete: <Button>Delete</Button>
    },
    {
      key: '2',
      name: 'Inodea',
      legalNo: 34,
      incorporation: 'İstanbul',
      website: 'https://www.inodea.com',
      edit: <Button>Edit</Button>,
      delete: <Button>Delete</Button>,
    }]);

  const handleFetchCompanies = async () => {
    // setData([]);
  }
  useEffect(() => {
    handleFetchCompanies();
    return () => { }
  }, [])

  const handleCreateCompany = async () => {
    setModal(prev => ({ ...prev, loading: true }));
    // process
    setModal(prev => ({ ...prev, show: false, loading: false }));
  }

  return (
    <div className="container">
      <div className="home-container">
        <h2>Companies</h2>
        <Row gutter={[24, 24]} >
          <Col span={12} style={{ textAlign: 'start' }}>
            <Input.Search placeholder="Search by company name" value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: 200 }} />
          </Col>
          <Col span={12} style={{ textAlign: 'end' }}>
            <Button onClick={() => setModal(prev => ({ ...prev, show: true }))}>Create New Company</Button>
          </Col>
          <Col span={24}>
            <Table dataSource={data.filter(elm => elm.name.toUpperCase().includes(search.toUpperCase()))} columns={columns} pagination={{ pageSize: 3 }} />
          </Col>
          <Col span={24}>
            <CustomButton bgColor="darkgreen" name="Back" type="button" onClick={() => navigate('/dashboard')} />
          </Col>
        </Row>
      </div>

      <Modal
        title="Create New Company"
        centered
        open={modal.show}
        onOk={handleCreateCompany}
        confirmLoading={modal.loading}
        onCancel={() => setModal(prev => ({ ...prev, show: false }))}
      >
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Input addonBefore="Name" />
          </Col>
          <Col span={24}>
            <Input addonBefore="Legal Number" />
          </Col>
          <Col span={24}>
            <Input addonBefore="Incorporation Country" />
          </Col>
          <Col span={24}>
            <Input addonBefore="Website" />
          </Col>
        </Row>
      </Modal>
    </div>
  )
}

export default Companies;
