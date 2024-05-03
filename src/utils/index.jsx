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

export function formatCurrency(amount, currency = 'USD', locale = 'en-US') {
	// Format number to currency
	const formatter = new Intl.NumberFormat(locale, {
		style: 'currency',
		currency: currency,
	});

	return formatter.format(amount);
}

export function formatPrice(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function increaseBy40Percent(number) {
	return number * 1.4;
}
