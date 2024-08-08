import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { API_URL } from '../config';

const SignUp: React.FC = () => {
	const navigate = useNavigate();
	const [, setCookie] = useCookies(['authToken']);
	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setError('Passwords do not match');
			return;
		}

		try {
			const response = await axios.post(`${API_URL}/api/v1/users/signup`, {
				name,
				username,
				password,
			});

			if (response.status === 200) {
				const { token } = response.data;
				setCookie('authToken', token, { path: '/' });
				navigate('/home');
			}
		} catch (error: any) {
			setError(error.response?.data?.message || 'Sign up failed');
		}
	};

	return (
		<div className='h-screen w-full flex items-center justify-center bg-gray-200'>
			<div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
				<h2 className='text-2xl font-bold mb-4'>Sign Up</h2>
				<form
					onSubmit={handleSubmit}
					className='space-y-4'>
					<div>
						<label
							htmlFor='name'
							className='block text-sm font-medium text-gray-700'>
							Name
						</label>
						<input
							type='text'
							id='name'
							value={name}
							onChange={(e) => setName(e.target.value)}
							className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
							required
						/>
					</div>
					<div>
						<label
							htmlFor='username'
							className='block text-sm font-medium text-gray-700'>
							Username (Email)
						</label>
						<input
							type='email'
							id='username'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
							required
						/>
					</div>
					<div>
						<label
							htmlFor='password'
							className='block text-sm font-medium text-gray-700'>
							Password
						</label>
						<input
							type='password'
							id='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
							required
						/>
					</div>
					<div>
						<label
							htmlFor='confirmPassword'
							className='block text-sm font-medium text-gray-700'>
							Confirm Password
						</label>
						<input
							type='password'
							id='confirmPassword'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
							required
						/>
					</div>
					{error && <p className='text-red-500 text-sm'>{error}</p>}
					<button
						type='submit'
						className='w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
						Sign Up
					</button>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
