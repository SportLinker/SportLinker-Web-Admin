export function handleSearch(key, selectedFilters) {
	const filteredData = dataSource.filter((item) => {
		const matchKey = Object.values(item).some((value) =>
			value.toString().toLowerCase().includes(key.toLowerCase())
		);
		const matchFilters = selectedFilters.every(
			(filter) =>
				item[filter] && item[filter].toString().toLowerCase().includes(key.toLowerCase())
		);
		return matchKey && matchFilters;
	});
	setFilteredDataSource(filteredData);
}
