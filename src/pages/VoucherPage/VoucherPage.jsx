import React, { useEffect, useState, Fragment } from 'react';
import { Button, Form, Modal, Table, Input, DatePicker, message, Popconfirm, Tag } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchVouchers,
  createVoucher,
  deleteVoucher,
  fetchVoucherDetails,
} from '../../redux/slices/voucherSlice';
import { fetchUsers } from '../../redux/slices/userSlice';
import {
  getAllVoucherSelector,
  getLoadingVoucherSelector,
  getVoucherDetailsSelector,
} from '../../redux/selectors';
import { Helmet } from 'react-helmet';

import styles from './VoucherPage.module.css';

const { Column } = Table;
const { Item } = Form;

const VoucherPage = () => {
  const dispatch = useDispatch();
  const vouchers = useSelector(getAllVoucherSelector);
  const voucherDetails = useSelector(getVoucherDetailsSelector);
  const loading = useSelector(getLoadingVoucherSelector);
  const [selectedUsers, setSelectedUsers] = useState([]); // State to store selected users (with id and name)
  const [selectedUserIds, setSelectedUserIds] = useState([]); // State to store selected user ids for API
  const [searchTerm, setSearchTerm] = useState('');
  const [usersLoading, setUsersLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [currentVoucher, setCurrentVoucher] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPage, setTotalPage] = useState(1);
  const [voucherList, setVoucherList] = useState([]);

  useEffect(() => {
    dispatch(fetchVouchers({ pageSize, currentPage }));
  }, [dispatch, pageSize, currentPage]);

  useEffect(() => {
    if (vouchers) {
      setVoucherList(vouchers);
      setTotalPage(vouchers.total_page);
    }
  }, [vouchers]);

  useEffect(() => {
    console.log('Selected Users:', selectedUsers);
    setSelectedUserIds(selectedUsers.map(user => user.id));
  }, [selectedUsers]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
    setUsersLoading(true);

    dispatch(fetchUsers({ currentPage: 1, pageSize, name: value }))
      .then((response) => {
        console.log('Response:', response);
        if (response.payload && response.payload.list_user) {
          setUsers(response.payload.list_user);
        } else {
          setUsers([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setUsers([]);
      })
      .finally(() => {
        setUsersLoading(false);
      });
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
    dispatch(fetchUsers({ currentPage: 1, pageSize, name: '' }))
      .then((response) => {
        if (response && response.metadata && response.metadata.list_user) {
          setUsers(response.metadata.list_user);
        } else {
          setUsers([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setUsers([]);
      })
      .finally(() => {
        setUsersLoading(false);
      });
  };

  const handleUserSelect = (user) => {
    setSelectedUsers((prevSelectedUsers) => {
      // Check if user already exists in selectedUsers
      if (!prevSelectedUsers.find(u => u.id === user.id)) {
        return [...prevSelectedUsers, user];
      }
      return prevSelectedUsers;
    });
    setSearchTerm(''); // Clear search term after selecting user
  };

  const handleDeleteUser = (userId) => {
    setSelectedUsers((prevSelectedUsers) => prevSelectedUsers.filter(user => user.id !== userId));
  };

  const handleCreateVoucher = () => {
    setModalVisible(true);
    form.resetFields();
    form.setFieldsValue({ to: 'All' });
  };

  const handleModalSuccess = () => {
    form.validateFields()
      .then(async (values) => {
        const formattedDate = moment(values.expired_at).toISOString();
        const floatValue = parseFloat(values.value) / 100;

        try {
          await dispatch(
            createVoucher({
              voucher_code: values.voucher_code,
              voucher_name: values.voucher_name,
              expired_at: formattedDate,
              value: floatValue,
              to: selectedUserIds, // Pass array of user IDs
            })
          );

          message.success('Voucher created successfully');
          setModalVisible(false);
          form.resetFields();
          dispatch(fetchVouchers({ pageSize, currentPage }));
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
      dispatch(fetchVouchers({ pageSize, currentPage }));
    } catch (error) {
      console.error('Error deleting voucher:', error);
      message.error('Failed to delete voucher');
    }
  };

  const handleViewDetails = async (voucherId) => {
    try {
      await dispatch(fetchVoucherDetails(voucherId));
      const selectedVoucher = voucherList.find((voucher) => voucher.id === voucherId);
      setCurrentVoucher(selectedVoucher);
      setDetailModalVisible(true);
    } catch (error) {
      console.error('Error fetching voucher details:', error);
      message.error('Failed to fetch voucher details');
    }
  };

  useEffect(() => {
    console.log('Current Voucher:', currentVoucher);
  }, [currentVoucher]);

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
            onRow={(record) => {
              return {
                onClick: () => {
                  handleViewDetails(record.id);
                },
              };
            }}
          >
            <Column title="Voucher Code" dataIndex="voucher_code" key="voucher_code" />
            <Column title="Voucher Name" dataIndex="voucher_name" key="voucher_name" />
            <Column
              title="Value"
              dataIndex="value"
              key="value"
              render={(value) => <span>{(value * 100).toFixed(1)}%</span>}
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
            <Column
              title="Actions"
              key="actions"
              render={(_, record) => (
                <Fragment>
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
                </Fragment>
              )}
            />
          </Table>
          <Modal
            title="Voucher Details"
            visible={detailModalVisible}
            onCancel={() => setDetailModalVisible(false)}
            footer={[
              <Button key="back" onClick={() => setDetailModalVisible(false)}>
                Close
              </Button>,
            ]}
          >
            {currentVoucher && (
              <Fragment>
                <p>
                  <strong>Voucher Code:</strong> {currentVoucher.voucher_code}
                </p>
                <p>
                  <strong>Voucher Name:</strong> {currentVoucher.voucher_name}
                </p>
                <p>
                  <strong>Value:</strong> {(currentVoucher.value * 100).toFixed(1)}%
                </p>
                <p>
                  <strong>Expired At:</strong> {formatDate(currentVoucher.expired_at)}
                </p>
                {voucherDetails &&
                  voucherDetails.detail &&
                  voucherDetails.detail.length > 0 && (
                    <Fragment>
                      <p>
                        <strong>To Users:</strong>
                      </p>
                      <div className={styles.userListContainer}>
                        {voucherDetails.detail.map((detail, index) => (
                          <div key={index} className={styles.userDetail}>
                            <div className={styles.userAvatar}>
                              <img src={detail.user.avatar_url} alt="Avatar" />
                            </div>
                            <div className={styles.userName}>
                              <p>{detail.user.name}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Fragment>
                  )}
              </Fragment>
            )}
          </Modal>

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
                rules={[{ required: true, message: 'Please input Voucher Code!' }]}
              >
                <Input />
              </Item>
              <Item
                label="Voucher Name"
                name="voucher_name"
                rules={[{ required: true, message: 'Please input Voucher Name!' }]}
              >
                <Input />
              </Item>
              <Item
                label="Value"
                name="value"
                rules={[{ required: true, message: 'Please input Value!' }]}
              >
                <Input type="number" />
              </Item>
              <Item
                label="Expired At"
                name="expired_at"
                rules={[{ required: true, message: 'Please select Expired At date!' }]}
              >
                <DatePicker format="YYYY-MM-DD" />
              </Item>
              <Item
                label="To"
                name="to"
                rules={[{ required: true, message: 'Please select To!' }]}
              >
                <Input.Search
                  placeholder="Search user by name"
                  enterButton="Search"
                  onSearch={handleSearch}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                />
                {!usersLoading && (
                  <ul className={styles.userList}>
                    {selectedUsers.map((user) => (
                      <li key={user.id}>
                        <div>{user.name}</div>
                        <div>{user.phone || 'Phone: N/A'}</div>
                        <div>{user.email || 'Email: N/A'}</div>
                        <Popconfirm
                          title="Are you sure to remove this user?"
                          onConfirm={() => handleDeleteUser(user.id)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button type="link" danger size="small">
                            Remove
                          </Button>
                        </Popconfirm>
                      </li>
                    ))}
                    {users.map((user) => (
                      <li key={user.id} onClick={() => handleUserSelect(user)}>
                        <div>{user.name}</div>
                        <div>{user.phone || 'Phone: N/A'}</div>
                        <div>{user.email || 'Email: N/A'}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </Item>
            </Form>
          </Modal>
        </div>
      </div>
    </Fragment>
  );
};

export default VoucherPage;
