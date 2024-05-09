import React, { useState } from 'react';
import { Form, Input, Button, Modal, Space, Checkbox, DatePicker } from 'antd';
import styles from './SearchFilter.module.css'; // Import module CSS

const { Item } = Form;
const { RangePicker } = DatePicker;

const SearchFilter = ({ fields, onSearch, initialValues = {}, searchPlaceholder = 'Search...' }) => {
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [selectedStatus, setSelectedStatus] = useState([]);

    const handleOpenModal = () => {
        form.setFieldsValue(initialValues);
        setModalVisible(true);
    };

    const handleCancelModal = () => {
        setModalVisible(false);
    };

    const handleApplyFilter = () => {
        const values = form.getFieldsValue();
        const filters = {};
        Object.keys(values).forEach(key => {
            if (values[key] !== undefined && values[key] !== null && values[key] !== '') {
                filters[key] = values[key];
            }
        });
        onSearch(searchValue, selectedStatus, filters);
        setModalVisible(false);
    };

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleStatusChange = (checkedValues) => {
        setSelectedStatus(checkedValues);
    };

    const renderField = (field) => {
        switch (field.type) {
            case 'Date':
                return <DatePicker style={{ width: '100%' }} />;
            case 'Status':
                return (
                    <Checkbox.Group style={{ width: '100%' }} onChange={handleStatusChange}>
                        {field.options.map(option => (
                            <Checkbox key={option} value={option}>
                                {option}
                            </Checkbox>
                        ))}
                    </Checkbox.Group>
                );
            case 'TextArea':
                return <Input.TextArea rows={3} placeholder={field.label} />;
            default:
                return <Input placeholder={field.label} />;
        }
    };

    return (
        <div className={styles.searchFilterContainer}>
            <Input
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={handleSearchChange}
                className={styles.searchInput}
            />
            <Button type="primary" className={styles.filterButton} onClick={handleOpenModal}>
                Filter
            </Button>
            <Modal
                title="Search"
                visible={modalVisible}
                onCancel={handleCancelModal}
                footer={null}
                className={styles.filterModal}
            >
                <Form form={form} layout="vertical">
                    <div className={styles.formFields}>
                        {fields.map((field, index) => (
                            <Space key={index} direction="vertical" className={styles.fieldContainer}>
                                <Item label={field.label} name={field.name}>
                                    {renderField(field)}
                                </Item>
                            </Space>
                        ))}
                    </div>
                    <div className={styles.buttonContainer}>
                        <Button
                            type="primary"
                            onClick={handleApplyFilter}
                            className={styles.applyButton}
                        >
                            Apply Filter
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default SearchFilter;
