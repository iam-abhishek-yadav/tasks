import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route,
} from 'react-router-dom';
import {
	Tasks,
	Calendar,
	Home,
	Issues,
	SignIn,
	SignUp,
	LandingPage,
} from './components/index';

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			{/* Root route */}
			<Route
				path='/'
				element={<LandingPage />}
			/>

			{/* Authentication Pages */}
			<Route
				path='/signup'
				element={<SignUp />}
			/>
			<Route
				path='/signin'
				element={<SignIn />}
			/>

			{/* Home route as a layout route */}
			<Route
				path='/home'
				element={<Home />}>
				{/* Nested routes */}
				<Route
					index
					element={<Tasks />}
				/>
				<Route
					path='calendar'
					element={<Calendar />}
				/>
				<Route
					path='issues'
					element={<Issues />}
				/>
			</Route>
		</>
	)
);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
