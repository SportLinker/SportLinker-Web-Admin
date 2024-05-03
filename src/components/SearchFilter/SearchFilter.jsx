import React, { useState } from 'react';
import { Form, Input, Button, Modal, Space } from 'antd';
import styles from './SearchFilter.module.css'; // Import module CSS

const { Item } = Form;

const SearchFilter = ({ fields, onSearch }) => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);

  const onFinish = (values) => {
    onSearch(values);
    setModalVisible(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleOpenModal = () => {
    form.resetFields(); // Reset form fields when opening modal
    setModalVisible(true);
  };

  const handleCancelModal = () => {
    setModalVisible(false);
  };

  return (
    <div>
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
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Space direction="horizontal">
            {fields.map((field) => (
              <Item key={field.name} label={field.label} name={field.name}>
                <Input
                  placeholder={`Enter ${field.label}`}
                  className={styles.inputField}
                />
              </Item>
            ))}
          </Space>
          <div className={styles.buttonContainer}>
            <Button type="primary" htmlType="submit" className={styles.applyButton}>
              Apply Filter
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default SearchFilter;
