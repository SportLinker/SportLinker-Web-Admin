import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Tag, Typography, Modal, Avatar, Button, Select, Input, Form } from 'antd';
import { Helmet } from 'react-helmet';
import dayjs from 'dayjs';
import { fetchTransactions, updateTransactionStatus } from '../../redux/slices/transactionSlice';
import { getAllTransactionsSelector, getLoadingTransactionSelector } from '../../redux/selectors';
import styles from './TransactionPage.module.css';

const { Column } = Table;
const { Title } = Typography;
const { Option } = Select;

const TransactionPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [transactions, setTransactions] = useState(null);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [transactionModalVisible, setTransactionModalVisible] = useState(false);
    const [totalPage, setTotalPage] = useState(1);
    const [status, setStatus] = useState('');
    const [rejectedReason, setRejectedReason] = useState('');

    const allTransactions = useSelector(getAllTransactionsSelector);
    const loading = useSelector(getLoadingTransactionSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTransactions({ currentPage, pageSize }));
    }, [dispatch, currentPage, pageSize]);

    useEffect(() => {
        setTransactions(allTransactions?.transactions);
        setTotalPage(allTransactions?.total_page);
    }, [allTransactions]);

    const handleRowClick = (record) => {
        setSelectedTransaction(record);
        setTransactionModalVisible(true);
    };

    const handleModalClose = () => {
        setTransactionModalVisible(false);
        setSelectedTransaction(null);
        setStatus('');
        setRejectedReason('');
    };

    const handleStatusChange = (value) => {
        setStatus(value);
    };

    const handleReasonChange = (e) => {
        setRejectedReason(e.target.value);
    };

    const handleUpdateTransaction = () => {
        if (selectedTransaction) {
            dispatch(updateTransactionStatus({
                transactionId: selectedTransaction.id,
                status,
                rejectedReason
            }));
            handleModalClose();
        }
    };

    return (
        <>
            <Helmet>
                <title>Manage Transactions</title>
            </Helmet>
            <div className={styles.transactionContainer}>
                <div className={styles.transactionTitle}>
                    <h1>Manage Transactions</h1>
                </div>

                <Table
                    dataSource={transactions}
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
                    onRow={(record) => ({
                        onClick: () => handleRowClick(record),
                    })}
                >
                    <Column
                        title="Transaction Code"
                        dataIndex="transaction_code"
                        key="transaction_code"
                    />
                    <Column
                        title="Amount"
                        dataIndex="amount"
                        key="amount"
                        render={(amount) => <span>{amount}đ</span>}
                    />
                    <Column title="Type" dataIndex="type" key="type" />
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
                                            : status === 'cancelled'
                                                ? 'orange'
                                                : 'red'
                                }
                            >
                                {status.toUpperCase()}
                            </Tag>
                        )}
                    />
                    <Column
                        title="Created At"
                        dataIndex="created_at"
                        key="created_at"
                        render={(createdAt) => (
                            <span>{dayjs(createdAt).format('DD-MM-YYYY HH:mm')}</span>
                        )}
                    />
                    <Column
                        title="User"
                        key="user"
                        render={(text, record) => (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar src={record.user.avatar_url} />
                                <span style={{ marginLeft: 8 }}>{record.user.name}</span>
                            </div>
                        )}
                    />
                </Table>

                <Modal
                    title="Transaction Details"
                    visible={transactionModalVisible}
                    onCancel={handleModalClose}
                    footer={[
                        <Button key="cancel" onClick={handleModalClose}>Cancel</Button>,
                        <Button key="update" type="primary" onClick={handleUpdateTransaction}>
                            Update Status
                        </Button>,
                    ]}
                >
                    {selectedTransaction && (
                        <div className={styles.modalContent}>
                            <p>
                                <strong>Transaction Code:</strong>{' '}
                                {selectedTransaction.transaction_code}
                            </p>
                            <p>
                                <strong>Amount:</strong> {selectedTransaction.amount}đ
                            </p>
                            <p>
                                <strong>Type:</strong> {selectedTransaction.type}
                            </p>
                            <p>
                                <strong>Status:</strong> {selectedTransaction.status}
                            </p>
                            <p>
                                <strong>Created At:</strong>{' '}
                                {dayjs(selectedTransaction.created_at).format('DD-MM-YYYY HH:mm')}
                            </p>
                            <div style={{ marginTop: 16 }}>
                                <strong>User:</strong>
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
                                    <Avatar src={selectedTransaction.user.avatar_url} />
                                    <span style={{ marginLeft: 8 }}>
                                        {selectedTransaction.user.name}
                                    </span>
                                </div>
                            </div>
                            <Form layout="vertical" style={{ marginTop: 16 }}>
                                <Form.Item label="Status">
                                    <Select value={status} onChange={handleStatusChange}>
                                        <Option value="completed">Completed</Option>
                                        <Option value="rejected">Rejected</Option>
                                    </Select>
                                </Form.Item>
                                {status === 'rejected' && (
                                    <Form.Item label="Rejected Reason">
                                        <Input.TextArea value={rejectedReason} onChange={handleReasonChange} />
                                    </Form.Item>
                                )}
                            </Form>
                        </div>
                    )}
                </Modal>
            </div>
        </>
    );
};

export default TransactionPage;
