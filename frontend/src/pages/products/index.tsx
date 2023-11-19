import CustomButton from '../../components/custom/Button';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Input, Modal, Row, Select, Table } from 'antd';
import { useEffect, useState } from 'react';
import useApollo from '../../hooks/useApollo';

const columns = [
  {
    title: 'Product Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Unit',
    dataIndex: 'unit',
    key: 'unit',
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
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
    category: string;
    amount: number;
    unit: string;
    company: string;
    edit: JSX.Element;
    delete: JSX.Element;
  }>>([
    {
      key: '1',
      name: 'Kamera',
      category: 'Technology',
      amount: 540,
      unit: 'TL',
      company: 'Inodea',
      edit: <Button>Edit</Button>,
      delete: <Button>Delete</Button>
    },
    {
      key: '2',
      name: 'Mikrofon',
      category: 'Technology',
      amount: 50,
      unit: 'TL',
      company: 'OPS',
      edit: <Button>Edit</Button>,
      delete: <Button>Delete</Button>
    }]);

  const handleFetchProducts = async () => {
    // setData([]);
  }
  useEffect(() => {
    handleFetchProducts();
    return () => { }
  }, [])

  const handleCreateProduct = async () => {
    setModal(prev => ({ ...prev, loading: true }));
    // process
    setModal(prev => ({ ...prev, show: false, loading: false }));
  }

  return (
    <div className="container">
      <div className="home-container">
        <h2>Products</h2>
        <Row gutter={[24, 24]} >
          <Col span={12} style={{ textAlign: 'start' }}>
            <Input.Search placeholder="Search by product name" value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: 200 }} />
          </Col>
          <Col span={12} style={{ textAlign: 'end' }}>
            <Button onClick={() => setModal(prev => ({ ...prev, show: true }))}>Create New Product</Button>
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
        title="Create New Product"
        centered
        open={modal.show}
        onOk={handleCreateProduct}
        confirmLoading={modal.loading}
        onCancel={() => setModal(prev => ({ ...prev, show: false }))}
      >
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Input addonBefore="Name" />
          </Col>
          <Col span={24}>
            <Input addonBefore="Category" />
          </Col>
          <Col span={24}>
            <Input addonBefore="Amount" />
          </Col>
          <Col span={24}>
            <Select
              style={{ width: '100%' }}
              placeholder="Select Unit"
              loading
              options={[
                { value: 'tl', label: 'Turkish Lira' },
                { value: 'dollar', label: 'Dollar' },
                { value: 'euro', label: 'Euro' },
              ]}
            />
          </Col>
          <Col span={24}>
            <Select
              style={{ width: '100%' }}
              placeholder="Select Company"
              loading
              options={[
                { value: 'jack', label: 'Jack' },
                { value: 'lucy', label: 'Lucy' },
                { value: 'Yiminghe', label: 'yiminghe' },
                { value: 'disabled', label: 'Disabled', disabled: true },]}
            />
          </Col>
        </Row>
      </Modal>
    </div>
  )
}

export default Companies;
