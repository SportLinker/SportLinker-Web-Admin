import React, { useState } from 'react';
import { Table, Tag, Typography, Modal } from 'antd';
import { formatPrice } from '../../utils';
import styles from './TransactionPage.module.css';
import dayjs from 'dayjs';
import SearchFilter from '../../components/SearchFilter/SearchFilter'; // Import the SearchFilter component

const { Title } = Typography;
const { Column } = Table;

const TransactionPage = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleOk = () => {
        setModalVisible(false);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const formatDate = (dateString) => {
        return dayjs(dateString).format('DD-MM-YYYY');
    };

    const dummyData = [...Array(10).keys()].map((index) => ({
        key: index,
        created_at: dayjs().subtract(index, 'day').format(),
        user: `User ${index + 1}`,
        item: `Item ${index + 1}`,
        amount: Math.floor(Math.random() * 1000) * 1000,
        transaction_code: `ABC${index + 1}`,
        status: index % 3 === 0 ? 'completed' : index % 3 === 1 ? 'pending' : 'failed',
    }));

    const handleSearch = (values) => {
        // Implement search logic here
        console.log('Search values:', values);
    };

    const fields = [
        { label: 'User', name: 'user' },
        { label: 'Item', name: 'item' },
        { label: 'Status', name: 'status', type: 'Select', options: ['completed', 'pending', 'failed'] },
        // Add more fields as needed
    ];

    return (
        <div className={styles.transactionContainer}>
            <div className={styles.reportTitle}>
                <h1>History Transaction</h1></div>
            <div className={styles.searchFilter}>
                <SearchFilter fields={fields} onSearch={handleSearch} />
            </div>
            <div className={styles.createBtn}>
                {/* Button for creating a report */}
            </div>
            <Table dataSource={dummyData} rowKey="key" pagination={{pageSize: 5}}>
                <Column
                    title="Create Day"
                    dataIndex="created_at"
                    key="created_at"
                    align="center"
                    render={(created_at) => <span>{formatDate(created_at)}</span>}
                />
                <Column title="User" dataIndex="user" key="user" />
                <Column title="Item" dataIndex="item" key="item" />
                <Column
                    title="Amount"
                    dataIndex="amount"
                    key="amount"
                    render={(amount) => <div>{formatPrice(amount)}đ</div>}
                />
                <Column
                    title="Transaction Code"
                    dataIndex="transaction_code"
                    key="transaction_code"
                />
                <Column
                    title="Status"
                    dataIndex="status"
                    key="status"
                    render={(status) => (
                        <Tag
                            color={
                                status === 'completed'
                                    ? 'green'
                                    : status === 'pending'
                                        ? 'blue'
                                        : 'red'
                            }
                        >
                            {status.toUpperCase()}
                        </Tag>
                    )}
                />
            </Table>
            <Modal
                title="Transaction Detail"
                visible={modalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                className={styles.customModal}
            >
                {/* Table for Transaction Detail */}
            </Modal>
        </div>
    );
};

export default TransactionPage;
