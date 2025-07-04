// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import React from 'react';
import RegisterForm from './components/auth/RegisterForm';
import LoginForm from './components/auth/LoginForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import Dashboard from './pages/Dashboard';
import TransactionList from './components/dashboard/TransactionList';
import BlockList from './components/dashboard/BlockList';
import SendTransactionForm from './components/dashboard/SendTransactionForm';
import MineBlock from './components/dashboard/MineBlock';
import DashboardLayout from './components/layout/DashboardNavLayout';
function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<StartPage />} />
				<Route path='/register' element={<RegisterForm />} />
				<Route path='/login' element={<LoginForm />} />
				<Route
					path='/dashboard'
					element={
						<DashboardLayout>
							<Dashboard />
						</DashboardLayout>
					}
				/>
				<Route
					path='/dashboard/transactions'
					element={
						<DashboardLayout>
							<TransactionList />
						</DashboardLayout>
					}
				/>
				<Route
					path='/dashboard/blocks'
					element={
						<DashboardLayout>
							<BlockList />
						</DashboardLayout>
					}
				/>
				<Route
					path='/dashboard/mine'
					element={
						<DashboardLayout>
							<MineBlock />
						</DashboardLayout>
					}
				/>
				<Route
					path='/dashboard/sendtransaction'
					element={
						<DashboardLayout>
							<SendTransactionForm />
						</DashboardLayout>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
