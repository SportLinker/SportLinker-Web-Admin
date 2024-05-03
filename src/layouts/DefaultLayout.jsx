import {
	DashboardOutlined,
	DisconnectOutlined,
	EditOutlined,
	FileTextOutlined,
	FundViewOutlined,
	TransactionOutlined,
	UserOutlined,
} from '@ant-design/icons';
import {Layout, Menu} from 'antd';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {imageExporter} from '../assets/images';
import {Header} from '../components/Header/Header';
import {getUserSelector} from '../redux/selectors';

const {Footer, Sider, Content} = Layout;

function getItem(label, key, icon, children) {
	return {
		key,
		icon,
		children,
		label,
	};
}

export const DefaultLayout = ({children}) => {
	const navigate = useNavigate();
	const [collapsed, setCollapsed] = useState(false);
	const location = useLocation();
	const [selectMenu, setSelectMenu] = useState(location.pathname);
	const userSelector = useSelector(getUserSelector);

	//Pages which will show sidebar menu
	const pageLocation = [
		'/dashboard',
		'/users',
		'/bets',
		'/reports',
		'/ads',
		'/posts',
		'/transactions',
		//add more pages here
	];

	//Menu sidebar items
	const items = [
		getItem('Dashboard', '/dashboard', <DashboardOutlined />),
		getItem('User', '/users', <UserOutlined />),
		getItem('Bet', '/bets', <DisconnectOutlined />),
		getItem('Report', '/reports', <FileTextOutlined />),
		getItem('Advertisement', '/ads', <FundViewOutlined />),
		getItem('Post', '/posts', <EditOutlined />),
		getItem('Transaction', '/transactions', <TransactionOutlined />),

		//add more items here
	];

	//handle save menu and redirect
	const handleClickMenuItem = (e) => {
		console.log('click ', e.key);
		setSelectMenu(e.key);
		navigate(e.key);
	};

	return (
		<Layout
			style={{
				minHeight: '100vh',
			}}
		>
			<Sider
				collapsed={collapsed}
				onCollapse={(value) => setCollapsed(value)}
				theme="light"
				style={{
					display: pageLocation.includes(location.pathname) ? 'block' : 'none',
				}}
			>
				<Link to="/dashboard" style={{width: '200px', height: '100px'}}>
					<img
						style={{
							width: '100%',
							maxHeight: '100%',
							objectPosition: 'center',
							objectFit: 'cover',
						}}
						src={imageExporter.logo}
						alt="logo"
					></img>
				</Link>
				<Menu
					onClick={handleClickMenuItem}
					theme="light"
					defaultSelectedKeys={['1']}
					selectedKeys={[selectMenu]}
					mode="inline"
					items={items}
				/>
			</Sider>
			<Layout style={{backgroundColor: '#eaeaea'}}>
				<Header />
				<Content
					style={{
						margin: '16px',
						overflow: 'hidden',
						backgroundColor: '#ffffff',
					}}
				>
					<div
						style={{
							minHeight: 360,
						}}
					>
						{children}
					</div>
				</Content>
				<Footer
					style={{
						textAlign: 'center',
					}}
				>
					SportLinker Admin Page ©{new Date().getFullYear()} Created by SportLinker Team
				</Footer>
			</Layout>
		</Layout>
	);
};
