import CustomButton from '../../components/custom/Button';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Input, Modal, Row, Select, Table } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import useApollo from '../../hooks/useApollo';
import { productTableColumns } from '../../constants/tableColumns';
import { IProduct } from '../../types/product.interface';
import { useAppSelector } from '../../redux/store';

interface ITableProduct extends IProduct {
  key: string;
  delete: JSX.Element;
}

const Companies = () => {
  const navigate = useNavigate();
  const { QueryRequest, MutationRequest } = useApollo();
  const { companies } = useAppSelector(state => state.companies);
  const [modal, setModal] = useState<{
    show: boolean;
    loading: boolean;
  }>({ show: false, loading: false });
  const [fields, setFields] = useState<IProduct>({
    _id: "",
    name: "",
    category: "",
    amount: 0,
    unit: "",
    company: "",
    companyId: "",
  });
  const [search, setSearch] = useState<string>('');
  const [data, setData] = useState<Array<ITableProduct>>([]);

  const handleFetchProducts = useCallback(async () => {
    await QueryRequest(`query {getMyProducts {_id name category amount unit company companyId }}`).then(res => {
      if (res.data.getMyProducts) {
        setData(res.data.getMyProducts.map((elm: IProduct) => ({
          key: elm._id,
          name: elm.name,
          category: elm.category,
          amount: elm.amount,
          unit: elm.unit,
          company: elm.company,
          companyId: elm.companyId,
          delete: <Button onClick={() => deleteProduct(elm._id)}>Delete</Button>,
        })));
      }
    }).catch(err => console.error("getMyCompanies err: ", err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleFetchProducts();
    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCreateProduct = async () => {
    setModal(prev => ({ ...prev, loading: true }));
    await MutationRequest(`mutation {
        createProduct(
          input: { name: "${fields.name}", category: "${fields.category}", amount: ${fields.amount}, unit: "${fields.unit}", companyId: "${fields.companyId}" }
        ) {_id name category amount unit company companyId}
      }`)
      .then(res => {
        if (res.data.createProduct?._id) {
          setData(prev => ([...prev, {
            _id: res.data.createProduct._id,
            key: res.data.createProduct._id,
            name: res.data.createProduct.name,
            category: res.data.createProduct.category,
            amount: res.data.createProduct.amount,
            unit: res.data.createProduct.unit,
            company: res.data.createProduct.company,
            companyId: res.data.createProduct.companyId,
            delete: <Button onClick={() => deleteProduct(res.data.createProduct._id)}>Delete</Button>,
          }]))
        }
      })
      .catch(err => console.error("createProduct err: ", err));
    setModal(prev => ({ ...prev, show: false, loading: false }));
  }

  const deleteProduct = async (productId: string) => {
    await MutationRequest(`mutation {
        deleteProduct(input: { productId: "${productId}" })
      }`)
      .then(res => res.data.deleteProduct && setData(prev => prev.filter(product => product.key.toLowerCase() !== productId.toLowerCase())))
      .catch(err => console.error("deleteProduct err: ", err));
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
            <Table dataSource={data.filter(elm => elm.name.toUpperCase().includes(search.toUpperCase()))} columns={productTableColumns} pagination={{ pageSize: 3 }} scroll={{ x: true }} />
          </Col>
          <Col span={24}>
            <CustomButton bgColor="blue" name="Back" type="button" onClick={() => navigate('/dashboard')} />
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
            <Input addonBefore="Name"
              value={fields.name}
              onChange={e => setFields(prev => ({ ...prev, name: e.target.value }))}
            />
          </Col>
          <Col span={24}>
            <Input addonBefore="Category"
              value={fields.category}
              onChange={e => setFields(prev => ({ ...prev, category: e.target.value }))}
            />
          </Col>
          <Col span={24}>
            <Input addonBefore="Amount" type='number'
              value={fields.amount}
              onChange={e => setFields(prev => ({ ...prev, amount: Number(e.target.value) }))}
            />
          </Col>
          <Col span={24}>
            <Select
              value={fields.unit}
              defaultValue={""}
              onChange={value => setFields(prev => ({ ...prev, unit: value }))}
              style={{ width: '100%' }}
              placeholder="Select Unit"
              options={[
                { value: '', label: 'Select Unit', disabled: true },
                { value: 'TL', label: 'Turkish Lira' },
                { value: 'Dollar', label: 'Dollar' },
                { value: 'Euro', label: 'Euro' },
              ]}
            />
          </Col>
          <Col span={24}>
            <Select
              value={fields.companyId}
              defaultValue={""}
              onChange={value => setFields(prev => ({ ...prev, companyId: value }))}
              style={{ width: '100%' }}
              placeholder="Select Company"
              loading={companies.length === 0}
              disabled={companies.length === 0}
              options={[{ value: "", label: "Select Company", disabled: true }].concat(companies.map(company => ({ value: company._id, label: company.name })) as any)}
            />
          </Col>
        </Row>
      </Modal>
    </div>
  )
}

export default Companies;
