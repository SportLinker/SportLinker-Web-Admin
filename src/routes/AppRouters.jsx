import React from 'react';
import {DefaultLayout} from '../layouts/DefaultLayout';
import {Navigate, Route, Routes} from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage/DashboardPage';
import {NotFoundPage} from '../pages/NotFoundPage/NotFoundPage';
import PermissionDeniedPage from '../pages/PermissionDeniedPage/PermissionDeniedPage';
import {UserPage} from '../pages/UserPage/UserPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import SignUpPage from '../pages/SignUpPage/SignUp';
import {BetPage} from '../pages/BetPage/BetPage';
import {ReportPage} from '../pages/ReportPage/ReportPage';
import AdPage from '../pages/AdPage/AdPage';
import PostPage from '../pages/PostPage/PostPage';
import TransactionPage from '../pages/TransactionPage/TransactionPage';

export const AppRouters = () => {
	return (
		<DefaultLayout>
			<Routes>
				<Route path="/" element={<Navigate to="/dashboard" />}></Route>
				<Route path="/dashboard" element={<DashboardPage />}></Route>
				<Route path="/users" element={<UserPage />}></Route>
				<Route path="/login" element={<LoginPage />}></Route>
				<Route path="/signup" element={<SignUpPage />}></Route>
				<Route path="/matches" element={<BetPage />}></Route>
				<Route path="/ads" element={<AdPage />}></Route>
				<Route path="/reports" element={<ReportPage />}></Route>
				<Route path="/posts" element={<PostPage />}></Route>
				<Route path="/transactions" element={<TransactionPage />}></Route>

				<Route path="/permission-denied" element={<PermissionDeniedPage />}></Route>
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</DefaultLayout>
	);
};
