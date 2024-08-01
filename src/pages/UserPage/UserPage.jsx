import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, DatePicker, Form, Input, Modal, Select, Table, Tag, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { fetchUsers, createUser, updateUser, deleteUser } from '../../redux/slices/userSlice';
import { getAllUserSelector, getLoadingUserSelector } from '../../redux/selectors';
import { Helmet } from 'react-helmet';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import styles from './UserPage.module.css';

const { Column } = Table;
const { Item } = Form;
const { Option } = Select;
const { Search } = Input;

const UserGender = {
  men: 'Men',
  women: 'Women',
  other: 'Other',
};

export const UserPage = () => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [premiumFilter, setPremiumFilter] = useState(''); // New state for premium filter

  const allUser = useSelector(getAllUserSelector);
  const loading = useSelector(getLoadingUserSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers({ currentPage, pageSize, name: searchTerm, isPremium: premiumFilter }));
  }, [dispatch, currentPage, pageSize, searchTerm, premiumFilter]);

  useEffect(() => {
    if (allUser) {
      form.setFieldsValue(allUser);
    }
  }, [allUser, form]);

  const handleCreateUser = () => {
    setModalVisible(true);
    form.resetFields();
  };

  const handleEdit = (record) => {
    form.setFieldsValue({
      name: record.name,
      email: record.email,
      phone: record.phone,
      role: record.role,
      gender: record.gender,
      date_of_birth: record.date_of_birth ? dayjs(record.date_of_birth) : null,
      status: record.status,
    });
    setSelectedUser(record);
    setModalVisible(true);
  };

  const handleDelete = (record) => {
    setSelectedUser(record);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteUser(selectedUser.id)).then(() =>
      dispatch(fetchUsers({ currentPage, pageSize, name: searchTerm, isPremium: premiumFilter }))
    );
    setDeleteModalVisible(false);
  };

  const handleModalSuccess = () => {
    form.validateFields()
      .then((values) => {
        if (values.date_of_birth) {
          values.date_of_birth = dayjs(values.date_of_birth).toISOString();
        }
        if (selectedUser) {
          dispatch(updateUser({ userId: selectedUser.id, userData: values })).then(() =>
            dispatch(fetchUsers({ currentPage, pageSize, name: searchTerm, isPremium: premiumFilter }))
          );
        } else {
          values.status = 'inactive'; // Default status for new users
          dispatch(createUser(values)).then(() =>
            dispatch(fetchUsers({ currentPage, pageSize, name: searchTerm, isPremium: premiumFilter }))
          );
        }
        setModalVisible(false);
        form.resetFields();
      })
      .catch((error) => {
        console.error('Form validation error:', error);
      });
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page on new search
    dispatch(fetchUsers({ currentPage: 1, pageSize, name: value, isPremium: premiumFilter }));
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1); // Reset to first page
    dispatch(fetchUsers({ currentPage: 1, pageSize, name: '', isPremium: premiumFilter }));
  };

  const handlePremiumFilterChange = (value) => {
    setPremiumFilter(value);
    setCurrentPage(1); // Reset to first page on new filter
    dispatch(fetchUsers({ currentPage: 1, pageSize, name: searchTerm, isPremium: value }));
  };

  const validatePassword = (_, value) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!value || regex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(
      'Password must contain at least 8 characters including uppercase letter, number, and special character.'
    );
  };

  return (
    <>
      <Helmet>
        <title>Manage User</title>
      </Helmet>
      <div className={styles.userContainer}>
        <div className={styles.userTitle}>
          <h1>Manage User</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className={styles.searchBar}>
            <Search
              placeholder="Search by name"
              onChange={(e) => handleSearch(e.target.value)}
              enterButton
              allowClear
              onClear={handleClearSearch}
            />
          </div>
          <div className={styles.premiumFilter}>
            <Select
              placeholder="Filter by Premium Status"
              onChange={handlePremiumFilterChange}
              allowClear
              style={{ width: 200, marginLeft: 16 }}
            >
              <Option value="">All</Option>
              <Option value="true">Premium</Option>
              <Option value="false">Non-Premium</Option>
            </Select>
          </div>
          <div className={styles.createBtn}>
            <Button type="primary" onClick={handleCreateUser}>
              Create User
            </Button>
          </div>
        </div>

        <Table
          dataSource={allUser?.list_user || []}
          rowKey="id"
          pagination={{
            pageSize,
            current: currentPage,
            total: searchTerm ? allUser?.total_count : allUser?.total_page * pageSize,
            onChange: (page, size) => {
              setCurrentPage(page);
              setPageSize(size);
              dispatch(
                fetchUsers({ currentPage: page, pageSize: size, name: searchTerm, isPremium: premiumFilter })
              );
            },
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
          loading={loading}
        >
          <Column title="User" dataIndex="name" key="name" />
          <Column title="Email" dataIndex="email" key="email" />
          <Column title="Phone" dataIndex="phone" key="phone" />
          <Column
            title="Role"
            dataIndex="role"
            key="role"
            render={(role) => (
              <Tag
                color={
                  role === 'player'
                    ? '#ab741a'
                    : role === 'admin'
                      ? '#37297a'
                      : role === 'coach'
                        ? '#f9a825'
                        : role === 'stadium'
                          ? '#4878d9'
                          : role === 'staff'
                            ? '#ff0000'
                            : ''
                }
              >
                {typeof role === 'string'
                  ? role.charAt(0).toUpperCase() + role.slice(1)
                  : ''}
              </Tag>
            )}
          />
          <Column
            title="Date of birth"
            dataIndex="date_of_birth"
            key="date_of_birth"
            render={(date_of_birth) =>
              date_of_birth ? dayjs(date_of_birth).format('DD-MM-YYYY') : ''
            }
          />
          <Column title="Premium" dataIndex="is_premium" key="is_premium" render={(is_premium) => (
            is_premium ? <Tag color="gold">Premium</Tag> : <Tag>Non-Premium</Tag>
          )} />
          <Column title="Gender" dataIndex="gender" key="gender" />
          <Column title="Status" dataIndex="status" key="status" />

          <Column
            title="Actions"
            key="actions"
            render={(text, record) => (
              <div>
                <Tooltip title="Edit">
                  <Button
                    icon={<EditFilled />}
                    onClick={() => handleEdit(record)}
                    style={{ marginRight: 8 }}
                  />
                </Tooltip>
                <Tooltip title="Delete">
                  <Button
                    icon={<DeleteFilled />}
                    onClick={() => handleDelete(record)}
                    danger
                  />
                </Tooltip>
              </div>
            )}
          />
        </Table>

        {/* Create/Update User Modal */}
        <Modal
          title={selectedUser ? 'Update User' : 'Create User'}
          visible={modalVisible}
          onOk={handleModalSuccess}
          onCancel={handleModalCancel}
          okText={selectedUser ? 'Update' : 'Create'}
        >
          <Form form={form} layout="vertical">
            <Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
              <Input />
            </Item>
            <Item name="email" label="Email" rules={[{ required: true, message: 'Please input the email!' }]}>
              <Input />
            </Item>
            <Item name="phone" label="Phone">
              <Input />
            </Item>
            <Item name="role" label="Role" rules={[{ required: true, message: 'Please select the role!' }]}>
              <Select>
                <Option value="player">Player</Option>
                <Option value="admin">Admin</Option>
                <Option value="coach">Coach</Option>
                <Option value="stadium">Stadium</Option>
                <Option value="staff">Staff</Option>
              </Select>
            </Item>
            <Item name="date_of_birth" label="Date of Birth">
              <DatePicker format="YYYY-MM-DD" />
            </Item>
            <Item name="gender" label="Gender">
              <Select>
                <Option value="men">Men</Option>
                <Option value="women">Women</Option>
                <Option value="other">Other</Option>
              </Select>
            </Item>
            <Item name="status" label="Status">
              <Select>
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </Item>
            {!selectedUser && (
              <Item name="password" label="Password" rules={[{ validator: validatePassword }]}>
                <Input.Password />
              </Item>
            )}
          </Form>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          title="Confirm Deletion"
          visible={deleteModalVisible}
          onOk={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          okText="Delete"
          cancelText="Cancel"
        >
          <p>Are you sure you want to delete {selectedUser?.name}?</p>
        </Modal>
      </div>
    </>
  );
};
