import { Button, Form, Modal, Table, Tag, Tooltip, Input, DatePicker, Select } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import styles from './VoucherPage.module.css';
import SearchFilter from '../../components/SearchFilter/SearchFilter';
import { Helmet } from 'react-helmet';

const { Column } = Table;
const { Item } = Form;

const dataSource = [
    {
        key: '1',
        voucher_code: 'VOUCHER001',
        value: 0.1,
        expired_at: moment().add(10, 'days').format('YYYY-MM-DD'),
        created_at: moment().subtract(1, 'days').format('YYYY-MM-DD'),
        to: 'All',
    },
    {
        key: '2',
        voucher_code: 'VOUCHER002',
        value: 0.2,
        expired_at: moment().add(20, 'days').format('YYYY-MM-DD'),
        created_at: moment().subtract(2, 'days').format('YYYY-MM-DD'),
        to: 'User 2',
    },
    {
        key: '3',
        voucher_code: 'VOUCHER003',
        value: 0.3,
        expired_at: moment().add(30, 'days').format('YYYY-MM-DD'),
        created_at: moment().subtract(3, 'days').format('YYYY-MM-DD'),
        to: 'All',
    },
    // Add more data as needed
];

export const VoucherPage = () => {
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const fields = [
        { label: 'Voucher Code', name: 'voucher_code' },
        { label: 'Value', name: 'value', type: 'Number' },
        { label: 'Expired At', name: 'expired_at', type: 'Date' },
        { label: 'Created At', name: 'created_at', type: 'Date' },
        { label: 'To', name: 'to' },
    ];

    const handleSearch = (values) => {
        // Handle search logic here
        console.log('Search values:', values);
    };

    const handleCreateVoucher = () => {
        setModalVisible(true);
        form.resetFields();
    };

    const handleModalSuccess = () => {
        form.validateFields()
            .then((values) => {
                console.log('Submitted form values:', values);
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

    const formatPercentage = (value) => {
        return `${(value * 100).toFixed(1)}%`;
    };

    return (
        <>
            <Helmet>
                <title>Manage Voucher</title>
            </Helmet>
            <div className={styles.voucherContainer}>
                <div className={styles.voucherTitle}>
                    <h1>Manage Vouchers</h1>
                </div>
                <SearchFilter fields={fields} onSearch={handleSearch} />
                <div className={styles.createBtn}>
                    <Button type="primary" onClick={handleCreateVoucher}>
                        Create Voucher
                    </Button>
                </div>
                <div>
                    <Table dataSource={dataSource} rowKey="key" pagination={{ pageSize: 5 }}>
                        <Column title="Voucher Code" dataIndex="voucher_code" key="voucher_code" />
                        <Column
                            title="Value"
                            dataIndex="value"
                            key="value"
                            render={(value) => <span>{formatPercentage(value)}</span>}
                        />
                        <Column title="Expired At" dataIndex="expired_at" key="expired_at" />
                        <Column title="Created At" dataIndex="created_at" key="created_at" />
                        <Column title="To" dataIndex="to" key="to" />
                        <Column
                            title="Action"
                            key="action"
                            render={(text, record) => (
                                <span>
                                    <Button type="primary" style={{ marginRight: 10 }}>
                                        <Tooltip title="Edit">Edit</Tooltip>
                                    </Button>
                                    <Button
                                        type="danger"
                                        style={{ backgroundColor: '#ff0000', color: 'white' }}
                                    >
                                        <Tooltip title="Delete">Delete</Tooltip>
                                    </Button>
                                </span>
                            )}
                        />
                    </Table>
                    <Modal
                        title={isEditMode ? "Edit Voucher" : "Create Voucher"}
                        visible={modalVisible}
                        onOk={handleModalSuccess}
                        onCancel={handleModalCancel}
                    >
                        <Form form={form} layout="vertical">
                            {fields.map((field) => (
                                <Item
                                    key={field.name}
                                    label={field.label}
                                    name={field.name}
                                    rules={[{ required: true, message: `Please input ${field.label.toLowerCase()}!` }]}
                                >
                                    {field.type === 'TextArea' ? (
                                        <Input.TextArea />
                                    ) : field.type === 'Number' ? (
                                        <Input type="number" />
                                    ) : field.type === 'Date' ? (
                                        <DatePicker format="YYYY-MM-DD" />
                                    ) : field.type === 'Select' ? (
                                        <Select>
                                            {field.options.map((option) => (
                                                <Select.Option key={option} value={option}>
                                                    {option}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    ) : (
                                        <Input />
                                    )}
                                </Item>
                            ))}
                        </Form>
                    </Modal>
                </div>
            </div>
        </>
    );
};

export default VoucherPage;
