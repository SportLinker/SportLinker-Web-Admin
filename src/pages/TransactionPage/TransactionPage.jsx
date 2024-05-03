import {Modal, Table, Tag, Typography} from 'antd';
import Column from 'antd/es/table/Column';
import dayjs from 'dayjs';
import React, {useState} from 'react';
import {formatPrice} from '../../utils';

const {Title} = Typography;

const TransactionPage = () => {
	const [filteredTransaction, setFilteredTransaction] = useState(null);
	const [selectedTransaction, setSelectedTransaction] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);

	const handleOk = () => {
		setModalVisible(false);
	};

	const handleCancel = () => {
		setModalVisible(false);
	};

	const columns = [
		{
			title: 'Field',
			dataIndex: 'field',
			key: 'field',
		},
		{
			title: 'Value',
			dataIndex: 'value',
			key: 'value',
			align: 'end',
			render: (status) => (
				<Tag
					color={
						status === 'completed'
							? 'green'
							: status === 'pending'
								? 'blue'
								: status === 'failed'
									? 'red'
									: '#b2b2b2'
					}
				>
					{typeof status === 'string' ? status.toUpperCase() : ''}
				</Tag>
			),
		},
	];

	const formatDate = (dateString) => {
		return dayjs(dateString).format('DD-MM-YYYY'); // Định dạng ngày tháng thành 'YYYY-MM-DD'
	};

	const dummyData = [...Array(10).keys()].map((index) => ({
		key: index,
		created_at: dayjs().subtract(index, 'day').format(),
		user: `User ${index + 1}`,
		item: `Item ${index + 1}`,
		amount: Math.floor(Math.random() * 1000) * 1000, // Giá trị ngẫu nhiên từ 0 đến 999,000 VND
		transaction_code: `ABC${index + 1}`,
		status: index % 3 === 0 ? 'completed' : index % 3 === 1 ? 'pending' : 'failed',
	}));

	return (
		<div style={{padding: 20}}>
			<Title level={2}>History Transaction</Title>

			<Table dataSource={dummyData} rowKey="key">
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
				className="custom-modal"
			>
				<Table
					columns={columns}
					dataSource={selectedTransaction ? selectedTransaction.details : []}
					pagination={{pageSize: 5}}
					size="middle"
					bordered={false}
					showHeader={false}
					style={{marginBottom: 0}}
				/>
			</Modal>
		</div>
	);
};

export default TransactionPage;
