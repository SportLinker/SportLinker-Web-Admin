import React from 'react';
import {Navigate} from 'react-router-dom';

const PrivateRoute = ({children}) => {
	const userLocal = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));

	if (!userLocal || !userLocal.user || !userLocal.user.role || userLocal.user.role !== 'admin') {
		return <Navigate to="/login" />;
	}

	return children;
};

export default PrivateRoute;
