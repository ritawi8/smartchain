// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import React from 'react';
import './App.css';
import RegisterForm from './components/auth/RegisterForm';
import LoginForm from './components/auth/LoginForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<StartPage />} />
				<Route path='/register' element={<RegisterForm />} />
				<Route path='/login' element={<LoginForm />} />
			</Routes>
		</Router>
	);
}

export default App;
