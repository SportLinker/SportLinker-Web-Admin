import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Tag, Typography, Modal, Avatar } from 'antd';
import { Helmet } from 'react-helmet';
import dayjs from 'dayjs';
import { fetchTransactions } from '../../redux/slices/transactionSlice';
import { getAllTransactionsSelector } from '../../redux/selectors';
import styles from './TransactionPage.module.css';

const { Column } = Table;
const { Title } = Typography;

const TransactionPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [transactions, setTransactions] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null); // State for selected transaction
  const [transactionModalVisible, setTransactionModalVisible] = useState(false); // State for modal visibility

  const allTransactions = useSelector(getAllTransactionsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactions({ currentPage, pageSize }));
  }, [dispatch, currentPage, pageSize]);

  useEffect(() => {
    setTransactions(allTransactions?.transactions);
  }, [allTransactions]);

  // Function to handle row click
  const handleRowClick = (record) => {
    setSelectedTransaction(record);
    setTransactionModalVisible(true);
  };

  // Function to handle modal close
  const handleModalClose = () => {
    setTransactionModalVisible(false);
    setSelectedTransaction(null);
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
          pagination={{ pageSize: 5 }}
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
          <Column
            title="Type"
            dataIndex="type"
            key="type"
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
          footer={null}
        >
          {selectedTransaction && (
            <div className={styles.modalContent}>
              <p><strong>Transaction Code:</strong> {selectedTransaction.transaction_code}</p>
              <p><strong>Amount:</strong> {selectedTransaction.amount}đ</p>
              <p><strong>Type:</strong> {selectedTransaction.type}</p>
              <p><strong>Status:</strong> {selectedTransaction.status}</p>
              <p><strong>Created At:</strong> {dayjs(selectedTransaction.created_at).format('DD-MM-YYYY HH:mm')}</p>
              {/* Add more details as needed */}
              <div style={{ marginTop: 16 }}>
                <strong>User:</strong>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
                  <Avatar src={selectedTransaction.user.avatar_url} />
                  <span style={{ marginLeft: 8 }}>{selectedTransaction.user.name}</span>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
};

export default TransactionPage;
