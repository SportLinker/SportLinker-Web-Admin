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

  const allUser = useSelector(getAllUserSelector);
  const loading = useSelector(getLoadingUserSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers({ currentPage, pageSize }));
  }, [dispatch, currentPage, pageSize]);

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
      dispatch(fetchUsers({ currentPage, pageSize }))
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
            dispatch(fetchUsers({ currentPage, pageSize }))
          );
        } else {
          values.status = 'inactive'; // Default status for new users
          dispatch(createUser(values)).then(() =>
            dispatch(fetchUsers({ currentPage, pageSize }))
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

        <div className={styles.createBtn}>
          <Button type="primary" onClick={handleCreateUser}>
            Create User
          </Button>
        </div>

        <Table
          dataSource={allUser?.list_user}
          rowKey="id"
          pagination={{
            pageSize,
            current: currentPage,
            total: allUser?.total_page * pageSize,
            onChange: (page, size) => {
              setCurrentPage(page);
              setPageSize(size);
            },
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
              <Tag color={
                role === 'player' ? '#ab741a' :
                  role === 'admin' ? '#37297a' :
                    role === 'coach' ? '#f9a825' :
                      role === 'stadium' ? '#4878d9' :
                        role === 'staff' ? '#ff0000' : ''
              }>
                {typeof role === 'string' ? role.charAt(0).toUpperCase() + role.slice(1) : ''}
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
          <Column title="Gender" dataIndex="gender" key="gender" />
          <Column title="Status" dataIndex="status" key="status" />

          <Column
            title="Action"
            key="action"
            render={(text, record) => (
              <span>
                <Button type="primary" onClick={() => handleEdit(record)} style={{ marginRight: 10 }}>
                  <Tooltip title="Edit">
                    <EditFilled />
                  </Tooltip>
                </Button>
                <Button
                  type="danger"
                  onClick={() => handleDelete(record)}
                  style={{ backgroundColor: '#ff0000', color: 'white' }}
                >
                  <Tooltip title="Delete">
                    <DeleteFilled />
                  </Tooltip>
                </Button>
              </span>
            )}
          />
        </Table>

        <Modal
          title={selectedUser ? 'Edit User' : 'Create User'}
          visible={modalVisible}
          onOk={handleModalSuccess}
          onCancel={handleModalCancel}
        >
          <Form form={form} layout="vertical" className={styles.formContainer}>
            <Item label="User" name="name">
              <Input />
            </Item>
            <Item label="Email" name="email">
              <Input />
            </Item>
            <Item label="Phone" name="phone">
              <Input />
            </Item>
            <Item label="Password" name="password" rules={[{ validator: validatePassword }]}>
              <Input.Password />
            </Item>
            <Item label="Role" name="role">
              <Select>
                <Option value="player">Player</Option>
                <Option value="admin">Admin</Option>
                <Option value="coach">Coach</Option>
                <Option value="stadium">Stadium</Option>
                <Option value="staff">Staff</Option>
              </Select>
            </Item>
            <Item label="Date of birth" name="date_of_birth">
              <DatePicker format="DD-MM-YYYY" />
            </Item>
            <Item label="Gender" name="gender">
              <Select>
                {Object.keys(UserGender).map(gender => (
                  <Option key={gender} value={gender}>
                    {UserGender[gender]}
                  </Option>
                ))}
              </Select>
            </Item>
            <Item label="Status" name="status">
              <Select>
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </Item>
          </Form>
        </Modal>

        <Modal
          title="Confirm Delete"
          visible={deleteModalVisible}
          onOk={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        >
          <p>Are you sure you want to delete this user?</p>
        </Modal>
      </div>
    </>
  );
};
