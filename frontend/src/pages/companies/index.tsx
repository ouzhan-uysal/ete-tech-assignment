import CustomButton from '../../components/custom/Button';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Input, Modal, Row, Table } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import useApollo from '../../hooks/useApollo';
import { ICompany } from '../../types/company.interface';
import { companyTableColumns } from '../../constants/tableColumns';

interface ITableCompany extends ICompany {
  key: string;
  delete: JSX.Element;
}

const Companies = () => {
  const navigate = useNavigate();
  const { QueryRequest, MutationRequest } = useApollo();
  const [modal, setModal] = useState<{
    show: boolean;
    loading: boolean;
  }>({ show: false, loading: false });
  const [fields, setFields] = useState<{
    name: string;
    legalNo: number;
    incorporationCountry: string;
    website: string;
  }>({
    name: "",
    legalNo: 0,
    incorporationCountry: "",
    website: "",
  });
  const [search, setSearch] = useState<string>('');
  const [data, setData] = useState<Array<ITableCompany>>([]);

  const handleFetchCompanies = useCallback(async () => {
    await QueryRequest(`query {
      getMyCompanies{_id name legalNo incorporationCountry website}
    }`).then(res => {
      if (res.data.getMyCompanies) {
        setData(res.data.getMyCompanies.map((elm: ICompany) => ({
          key: elm._id,
          name: elm.name,
          legalNo: elm.legalNo,
          incorporationCountry: elm.incorporationCountry,
          website: elm.website,
          delete: <Button onClick={() => deleteCompany(elm._id)}>Delete</Button>,
        })));
      }
    }).catch(err => console.error("getMyCompanies err: ", err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleFetchCompanies();
    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCreateCompany = async () => {
    setModal(prev => ({ ...prev, loading: true }));
    await MutationRequest(`mutation {
      createCompany(
        input: { name: "${fields.name}", legalNo: ${fields.legalNo}, incorporationCountry: "${fields.incorporationCountry}", website: "${fields.website}" }
      ) {_id name legalNo incorporationCountry website}
    }`)
      .then(res => {
        if (res.data.createCompany?._id) {
          setData(prev => ([...prev, {
            _id: res.data.createCompany._id,
            key: res.data.createCompany._id,
            name: res.data.createCompany.name,
            legalNo: res.data.createCompany.legalNo,
            incorporationCountry: res.data.createCompany.incorporationCountry,
            website: res.data.createCompany.website,
            delete: <Button onClick={() => deleteCompany(res.data.createCompany._id)}>Delete</Button>,
          }]))
        }
      })
      .catch(err => console.error("createCompany err: ", err));
    setModal(prev => ({ ...prev, show: false, loading: false }));
  }

  const deleteCompany = async (companyId: string) => {
    await MutationRequest(`mutation {
      deleteCompany(input: { companyId: "${companyId}" })
    }`)
      .then(res => res.data.deleteCompany && setData(prev => prev.filter(company => company.key.toLowerCase() !== companyId.toLowerCase())))
      .catch(err => console.error("deleteCompany err: ", err));
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
            <Table dataSource={data.filter(elm => elm.name.toUpperCase().includes(search.toUpperCase()))} columns={companyTableColumns} pagination={{ pageSize: 3 }} scroll={{ x: true }} />
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
            <Input addonBefore="Name"
              value={fields.name}
              onChange={(e) => setFields(prev => ({ ...prev, name: e.target.value }))} />
          </Col>
          <Col span={24}>
            <Input addonBefore="Legal Number" type='number'
              value={fields.legalNo}
              onChange={(e) => setFields(prev => ({ ...prev, legalNo: Number(e.target.value) }))} />
          </Col>
          <Col span={24}>
            <Input addonBefore="Incorporation Country"
              value={fields.incorporationCountry}
              onChange={(e) => setFields(prev => ({ ...prev, incorporationCountry: e.target.value }))} />
          </Col>
          <Col span={24}>
            <Input addonBefore="Website"
              value={fields.website}
              onChange={(e) => setFields(prev => ({ ...prev, website: e.target.value }))} />
          </Col>
        </Row>
      </Modal>
    </div>
  )
}

export default Companies;
