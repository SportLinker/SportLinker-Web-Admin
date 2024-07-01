import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Select, Table, Tag, message } from 'antd'; // Import message from antd for notification
import { Helmet } from 'react-helmet';
import dayjs from 'dayjs';
import { fetchStadiums, updateStadiumStatus } from '../../redux/slices/stadiumSlice';
import { getAllStadiumSelector, getLoadingStadiumSelector } from '../../redux/selectors';
import styles from './StadiumPage.module.css';

const { Column } = Table;
const { Option } = Select;

export const StadiumPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPage, setTotalPage] = useState(1);
    const [stadiums, setStadiums] = useState(null);
    const [selectedStadium, setSelectedStadium] = useState(null); // State for selected stadium
    const [stadiumModalVisible, setStadiumModalVisible] = useState(false); // State for modal visibility
    const [statusToUpdate, setStatusToUpdate] = useState(null); // State for stadium status update

    const allStadiums = useSelector(getAllStadiumSelector);
    const loading = useSelector(getLoadingStadiumSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchStadiums({ currentPage, pageSize }));
    }, [dispatch, currentPage, pageSize]);

    useEffect(() => {
        setStadiums(allStadiums?.list_stadium);
        setTotalPage(allStadiums.total_page);
    }, [allStadiums]);

    // Function to handle row click
    const handleRowClick = (record) => {
        setSelectedStadium(record); // Update selected stadium
        setStadiumModalVisible(true); // Show modal
    };

    // Function to handle modal close
    const handleModalClose = () => {
        setStadiumModalVisible(false); // Hide modal
        setSelectedStadium(null); // Clear selected stadium
        setStatusToUpdate(null); // Clear status update state
    };

    // Function to update stadium status
    const handleUpdateStatus = async () => {
        if (selectedStadium && statusToUpdate) {
            try {
                await dispatch(updateStadiumStatus({ stadiumId: selectedStadium.id, status: statusToUpdate }));
                message.success('Stadium status updated successfully!');
                // Refresh stadiums after update
                dispatch(fetchStadiums({ currentPage, pageSize }));
                setStadiumModalVisible(false); // Close modal after successful update
            } catch (error) {
                console.error('Failed to update stadium status:', error);
                message.error('Failed to update stadium status. Please try again.');
            }
        }
    };

    return (
        <>
            <Helmet>
                <title>Manage Stadiums</title>
            </Helmet>
            <div className={styles.stadiumContainer}>
                <div className={styles.stadiumTitle}>
                    <h1>Manage Stadiums</h1>
                </div>
                <div>
                    <Table
                        dataSource={stadiums}
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
                        <Column title="Stadium Name" dataIndex="stadium_name" key="stadium_name" />
                        <Column title="Address" dataIndex="stadium_address" key="stadium_address" />
                        <Column title="Description" dataIndex="stadium_description" key="stadium_description" />
                        <Column title="Operating Hours" dataIndex="stadium_time" key="stadium_time" />
                        <Column
                            title="Status"
                            dataIndex="stadium_status"
                            key="stadium_status"
                            render={(status) => (
                                <Tag color={status === 'approved' ? 'green' : 'red'}>
                                    {status.toUpperCase()}
                                </Tag>
                            )}
                        />
                        <Column
                            title="Owner"
                            key="owner"
                            render={(text, record) => (
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img
                                        src={record.owner.avatar_url}
                                        alt="Avatar"
                                        style={{
                                            marginRight: 8,
                                            borderRadius: '50%',
                                            width: 30,
                                            height: 30,
                                        }}
                                    />
                                    <span>{record.owner.name}</span>
                                </div>
                            )}
                        />
                    </Table>

                    <Modal
                        title="Stadium Details"
                        visible={stadiumModalVisible}
                        onCancel={handleModalClose}
                        footer={null}
                    >
                        {selectedStadium && (
                            <div>
                                <p>
                                    <strong>Stadium Name:</strong> {selectedStadium.stadium_name}
                                </p>
                                <p>
                                    <strong>Address:</strong> {selectedStadium.stadium_address}
                                </p>
                                <p>
                                    <strong>Description:</strong> {selectedStadium.stadium_description}
                                </p>
                                <p>
                                    <strong>Operating Hours:</strong> {selectedStadium.stadium_time}
                                </p>
                                <p>
                                    <strong>Status:</strong> {selectedStadium.stadium_status}
                                </p>
                                <p>
                                    <strong>Owner:</strong> {selectedStadium.owner.name}
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img
                                        src={selectedStadium.owner.avatar_url}
                                        alt="Avatar"
                                        style={{
                                            marginRight: 8,
                                            borderRadius: '50%',
                                            width: 30,
                                            height: 30,
                                        }}
                                    />
                                </div>

                                {/* Status update select */}
                                <Select
                                    style={{ width: 200, marginTop: 16 }}
                                    placeholder="Select Status"
                                    onChange={(value) => setStatusToUpdate(value)}
                                    value={statusToUpdate} // Ensure select shows correct statusToUpdate
                                >
                                    <Option value="approved">Approved</Option>
                                    <Option value="rejected">Rejected</Option>
                                </Select>

                                <button onClick={handleUpdateStatus} style={{ marginTop: 16 }}>
                                    Update Status
                                </button>
                            </div>
                        )}
                    </Modal>
                </div>
            </div>
        </>
    );
};
