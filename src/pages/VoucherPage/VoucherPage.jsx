import React, {useEffect, useState, Fragment} from 'react';
import {Button, Form, Modal, Table, Input, DatePicker, message, Popconfirm} from 'antd';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {fetchVouchers, createVoucher, deleteVoucher} from '../../redux/slices/voucherSlice'; // Import deleteVoucher from Redux slice
import {getAllVoucherSelector, getLoadingVoucherSelector} from '../../redux/selectors';

import styles from './VoucherPage.module.css';
import {Helmet} from 'react-helmet';

const {Column} = Table;
const {Item} = Form;

const VoucherPage = () => {
  const dispatch = useDispatch();
  const vouchers = useSelector(getAllVoucherSelector);
  const loading = useSelector(getLoadingVoucherSelector);
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPage, setTotalPage] = useState(1);
  const [voucherList, setVoucherList] = useState([]);

  useEffect(() => {
    dispatch(fetchVouchers({pageSize, currentPage}));
  }, [dispatch, pageSize, currentPage]);

  useEffect(() => {
    if (vouchers) {
      setVoucherList(vouchers);
      setTotalPage(vouchers.total_page);
    }
  }, [vouchers]);

  const handleCreateVoucher = () => {
    setModalVisible(true);
    form.resetFields();
	form.setFieldsValue({ to: 'All' });
  };

  const handleModalSuccess = () => {
    form.validateFields()
      .then(async (values) => {
        const formattedDate = moment(values.expired_at).toISOString(); // Convert to ISO-8601 format
        const floatValue = parseFloat(values.value) / 100; // Convert percentage to decimal

        try {
          await dispatch(
            createVoucher({
              voucher_code: values.voucher_code,
              voucher_name: values.voucher_name,
              expired_at: formattedDate,
              value: floatValue,
              to: values.to,
            })
          );

          message.success('Voucher created successfully');
          setModalVisible(false);
          form.resetFields();
          dispatch(fetchVouchers({pageSize, currentPage}));
        } catch (error) {
          console.error('Error creating voucher:', error);
          message.error('Failed to create voucher');
        }
      })
      .catch((error) => {
        console.error('Form validation error:', error);
      });
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const formatDate = (date) => {
    return moment(date).format('DD/MM/YYYY');
  };

  const handleDelete = async (voucherId) => {
    try {
      await dispatch(deleteVoucher(voucherId));
      message.success('Voucher deleted successfully');
      dispatch(fetchVouchers({pageSize, currentPage}));
    } catch (error) {
      console.error('Error deleting voucher:', error);
      message.error('Failed to delete voucher');
    }
  };

  return (
    <Fragment>
      <Helmet>
        <title>Manage Voucher</title>
      </Helmet>
      <div className={styles.voucherContainer}>
        <div className={styles.voucherTitle}>
          <h1>Manage Vouchers</h1>
        </div>
        <div className={styles.createBtn}>
          <Button type="primary" onClick={handleCreateVoucher}>
            Create Voucher
          </Button>
        </div>
        <div>
          <Table
            dataSource={voucherList}
            rowKey="id"
            pagination={{
              pageSize,
              current: currentPage,
              total: totalPage * pageSize,
              onChange: (page, size) => {
                setCurrentPage(page);
                setPageSize(size);
              },
            }}
            loading={loading}
          >
            <Column title="Voucher Code" dataIndex="voucher_code" key="voucher_code" />
            <Column title="Voucher Name" dataIndex="voucher_name" key="voucher_name" />
            <Column
              title="Value"
              dataIndex="value"
              key="value"
              render={(value) => <span>{`${(value * 100).toFixed(1)}%`}</span>}
            />
            <Column
              title="Expired At"
              dataIndex="expired_at"
              key="expired_at"
              render={(expired_at) => <span>{formatDate(expired_at)}</span>}
            />
            <Column
              title="Created At"
              dataIndex="created_at"
              key="created_at"
              render={(created_at) => <span>{formatDate(created_at)}</span>}
            />
            <Column title="To" dataIndex="to" key="to" />
            <Column
              title="Actions"
              key="actions"
              render={(_, record) => (
                <Popconfirm
                  title="Are you sure to delete this voucher?"
                  onConfirm={() => handleDelete(record.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="link" danger>
                    Delete
                  </Button>
                </Popconfirm>
              )}
            />
          </Table>
          <Modal
            title="Create Voucher"
            visible={modalVisible}
            onOk={handleModalSuccess}
            onCancel={handleModalCancel}
          >
            <Form form={form} layout="vertical">
              <Item
                label="Voucher Code"
                name="voucher_code"
                rules={[{required: true, message: 'Please input Voucher Code!'}]}
              >
                <Input />
              </Item>
              <Item
                label="Voucher Name"
                name="voucher_name"
                rules={[{required: true, message: 'Please input Voucher Name!'}]}
              >
                <Input />
              </Item>
              <Item
                label="Value"
                name="value"
                rules={[{required: true, message: 'Please input Value!'}]}
              >
                <Input type="number" />
              </Item>
              <Item
                label="Expired At"
                name="expired_at"
                rules={[
                  {required: true, message: 'Please select Expired At date!'},
                ]}
              >
                <DatePicker format="YYYY-MM-DD" />
              </Item>
              <Item
                label="To"
                name="to"
                rules={[{required: true, message: 'Please input To!'}]}
              >
                <Input />
              </Item>
            </Form>
          </Modal>
        </div>
      </div>
    </Fragment>
  );
};

export default VoucherPage;
