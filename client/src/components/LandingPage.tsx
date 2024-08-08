import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const LandingPage: React.FC = () => {
	const navigate = useNavigate();
	const [cookies, , removeCookie] = useCookies(['authToken']);

	const isLoggedIn = cookies.authToken && cookies.authToken.trim() !== '';

	const handleManageTasksClick = () => {
		if (isLoggedIn) {
			navigate('/home');
		} else {
			navigate('/signin');
		}
	};

	const handleLogout = () => {
		removeCookie('authToken');
		navigate('/signin');
	};

	return (
		<div className='h-screen w-full flex flex-col items-center justify-center bg-gray-300'>
			{/* Sign Up / Sign In Buttons */}
			<div className='absolute top-4 right-4 flex space-x-4'>
				{!isLoggedIn ? (
					<>
						<Link to='/signup'>
							<button className='bg-blue-800 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300'>
								Sign Up
							</button>
						</Link>
						<Link to='/signin'>
							<button className='bg-green-800 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-300'>
								Sign In
							</button>
						</Link>
					</>
				) : (
					<button
						onClick={handleLogout}
						className='bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-500 transition duration-300'>
						Logout
					</button>
				)}
			</div>

			{/* Tagline */}
			<div className='mt-12 text-center'>
				<h1 className='text-4xl font-extrabold text-gray-900 mb-4'>
					Tasks App
				</h1>
				<p className='text-lg text-gray-900'>
					Organize your life with ease. Manage your tasks efficiently.
				</p>
			</div>

			<div className='mt-8'>
				<button
					onClick={handleManageTasksClick}
					className='bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-500 transition duration-300'>
					Manage Tasks
				</button>
			</div>

			{/* Features Table */}
			<div className='overflow-x-auto w-full max-w-5xl mt-8 mb-12'>
				<table className='min-w-full bg-white rounded-3xl shadow-md'>
					<thead>
						<tr className='border-b border-gray-300'>
							<th className='p-4 text-left text-gray-700 font-semibold'>
								Feature
							</th>
							<th className='p-4 text-left text-gray-700 font-semibold text-center'>
								Personal
							</th>
							<th className='p-4 text-left text-gray-700 font-semibold text-center'>
								Team
							</th>
							<th className='p-4 text-left text-gray-700 font-semibold text-center'>
								Advanced
							</th>
						</tr>
					</thead>
					<tbody>
						<tr className='border-b border-gray-200'>
							<td className='p-4 text-gray-800'>Create Tasks</td>
							<td className='p-4 text-center'>
								<span className='text-green-500'>✔</span>
							</td>
							<td className='p-4 text-center'>
								<span className='text-green-500'>✔</span>
							</td>
							<td className='p-4 text-center'>
								<span className='text-green-500'>✔</span>
							</td>
						</tr>
						<tr className='border-b border-gray-200'>
							<td className='p-4 text-gray-800'>Edit Tasks</td>
							<td className='p-4 text-center'>
								<span className='text-green-500'>✔</span>
							</td>
							<td className='p-4 text-center'>
								<span className='text-green-500'>✔</span>
							</td>
							<td className='p-4 text-center'>
								<span className='text-green-500'>✔</span>
							</td>
						</tr>
						<tr className='border-b border-gray-200'>
							<td className='p-4 text-gray-800'>Delete Tasks</td>
							<td className='p-4 text-center'>
								<span className='text-green-500'>✔</span>
							</td>
							<td className='p-4 text-center'>
								<span className='text-green-500'>✔</span>
							</td>
							<td className='p-4 text-center'>
								<span className='text-green-500'>✔</span>
							</td>
						</tr>
						<tr className='border-b border-gray-200'>
							<td className='p-4 text-gray-800'>Set Reminders</td>
							<td className='p-4 text-center'>
								<span className='text-green-500'>✔</span>
							</td>
							<td className='p-4 text-center'>
								<span className='text-green-500'>✔</span>
							</td>
							<td className='p-4 text-center'>
								<span className='text-green-500'>✔</span>
							</td>
						</tr>
						<tr className='border-b border-gray-200'>
							<td className='p-4 text-gray-800'>View in Calendar</td>
							<td className='p-4 text-center'>
								<span className='text-green-500'>✔</span>
							</td>
							<td className='p-4 text-center'>
								<span className='text-green-500'>✔</span>
							</td>
							<td className='p-4 text-center'>
								<span className='text-green-500'>✔</span>
							</td>
						</tr>
						<tr className='border-b border-gray-200'>
							<td className='p-4 text-gray-800'>Create Teams</td>
							<td className='p-4 text-center'>
								<span className='text-red-400'>✘</span>
							</td>
							<td className='p-4 text-center'>
								<span className='text-green-500'>✔</span>
							</td>
							<td className='p-4 text-center'>
								<span className='text-green-500'>✔</span>
							</td>
						</tr>
						<tr className='border-b border-gray-200'>
							<td className='p-4 text-gray-800'>Assign Tasks</td>
							<td className='p-4 text-center'>
								<span className='text-red-400'>✘</span>
							</td>
							<td className='p-4 text-center'>
								<span className='text-green-500'>✔</span>
							</td>
							<td className='p-4 text-center'>
								<span className='text-green-500'>✔</span>
							</td>
						</tr>
						<tr className='border-b border-gray-200'>
							<td className='p-4 text-gray-800'>Subtasks</td>
							<td className='p-4 text-center'>
								<span className='text-red-400'>✘</span>
							</td>
							<td className='p-4 text-center'>
								<span className='text-red-400'>✘</span>
							</td>
							<td className='p-4 text-center'>
								<span className='text-green-500'>✔</span>
							</td>
						</tr>
						<tr className='border-b border-gray-200'>
							<td className='p-4 text-gray-800'>Comments</td>
							<td className='p-4 text-center'>
								<span className='text-red-400'>✘</span>
							</td>
							<td className='p-4 text-center'>
								<span className='text-red-400'>✘</span>
							</td>
							<td className='p-4 text-center'>
								<span className='text-green-500'>✔</span>
							</td>
						</tr>
						<tr className='border-b border-gray-200'>
							<td className='p-4 text-gray-800'>Notes</td>
							<td className='p-4 text-center'>
								<span className='text-red-400'>✘</span>
							</td>
							<td className='p-4 text-center'>
								<span className='text-red-400'>✘</span>
							</td>
							<td className='p-4 text-center'>
								<span className='text-green-500'>✔</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default LandingPage;
