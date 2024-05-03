import React, {useState} from 'react';
import {Form, Input, Button, Modal, Space, Checkbox} from 'antd';
import styles from './SearchFilter.module.css'; // Import module CSS

const {Item} = Form;

const SearchFilter = ({fields, onSearch, initialValues = {}, searchPlaceholder = 'Search...'}) => {
	const [form] = Form.useForm();
	const [modalVisible, setModalVisible] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [selectedFilters, setSelectedFilters] = useState([]);

	console.log('selectedFilters', selectedFilters);

	const handleOpenModal = () => {
		form.setFieldsValue(initialValues);
		setModalVisible(true);
	};

	const handleCancelModal = () => {
		setModalVisible(false);
	};

	const handleApplyFilter = () => {
		const values = form.getFieldsValue();
		const selectedValues = Object.keys(values).filter((key) => values[key]);
		onSearch(searchValue, selectedValues);
		setModalVisible(false);
	};

	const handleSearchChange = (e) => {
		setSearchValue(e.target.value);
	};

	const handleFilterChange = (checkedValues) => {
		setSelectedFilters(checkedValues);
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
					<Space direction="vertical">
						<Checkbox.Group onChange={handleFilterChange}>
							{fields.map((field) => (
								<Item
									key={field.name}
									name={field.name}
									valuePropName="checked"
									className={styles.checkboxItem}
								>
									<Checkbox className={styles.checkbox} value={field.name}>
										{field.label}
									</Checkbox>
								</Item>
							))}
						</Checkbox.Group>
					</Space>
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
