import { useEffect, useState, ChangeEvent } from 'react';
import axios from 'axios';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select';
import { Input } from './ui/input';
import { Button } from './ui/button';
import Task from './Task';
import AddTask from './AddTask';
import { API_URL } from '../config';

const Tasks = () => {
	const [tasks, setTasks] = useState<any[]>([]);
	const [filteredTasks, setFilteredTasks] = useState<any[]>([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedFilter, setSelectedFilter] = useState<string>('Default');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchTasks = async () => {
			setLoading(true);
			try {
				const response = await axios.get(`${API_URL}/api/v1/tasks`);
				setTasks(response.data.tasks);
			} catch (err) {
				setError('Failed to load tasks');
				console.error('Error fetching tasks:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchTasks();
	}, []);

	useEffect(() => {
		const applyFiltersAndSearch = () => {
			let filtered = [...tasks];

			if (searchQuery) {
				filtered = filtered.filter((task) =>
					task.description.toLowerCase().includes(searchQuery.toLowerCase())
				);
			}
			switch (selectedFilter) {
				case 'Completed':
					filtered = filtered.filter((task) => task.completed);
					break;
				case 'Due Today': {
					const today = new Date().toISOString().split('T')[0];
					filtered = filtered.filter(
						(task) => task.dueDate?.split('T')[0] === today
					);
					break;
				}
				case 'Not Completed':
					filtered = filtered.filter((task) => !task.completed);
					break;
				default:
					break;
			}

			setFilteredTasks(filtered);
		};

		applyFiltersAndSearch();
	}, [tasks, searchQuery, selectedFilter]);

	const handleSearch = () => {
		setSearchQuery(searchQuery);
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	const handleFilterChange = (value: string) => {
		setSelectedFilter(value);
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div>
			<div className='flex flex-row items-start gap-5 border border-white p-3'>
				<div className='flex w-full max-w-md items-center space-x-2'>
					<Input
						type='search'
						placeholder='Search'
						className='bg-slate-900 text-white'
						value={searchQuery}
						onChange={handleChange}
					/>
					<Button
						type='button'
						onClick={handleSearch}
						className='bg-white text-black'>
						Search
					</Button>
				</div>
				<div>
					<Select
						value={selectedFilter}
						onValueChange={handleFilterChange}>
						<SelectTrigger className='w-[140px] bg-slate-900'>
							<SelectValue className='text-white'>
								{selectedFilter === 'Default'
									? 'Select Filter'
									: selectedFilter}
							</SelectValue>
						</SelectTrigger>
						<SelectContent className='bg-slate-800 text-white'>
							<SelectItem
								value='Default'
								className='hover:bg-slate-700 hover:text-white'>
								Clear Filter
							</SelectItem>
							<SelectItem
								value='Completed'
								className='hover:bg-slate-700 hover:text-white'>
								Completed
							</SelectItem>
							<SelectItem
								value='Due Today'
								className='hover:bg-slate-700 hover:text-white'>
								Due Today
							</SelectItem>
							<SelectItem
								value='Not Completed'
								className='hover:bg-slate-700 hover:text-white'>
								Not Completed
							</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div>
					<AddTask setTasks={setTasks} />
				</div>
			</div>
			<div>
				<div className='flex flex-col gap-4 max-h-[89vh] overflow-y-auto bg-slate-900 mt-2 p-4 border border-white p-3'>
					{filteredTasks.map((task) => (
						<Task
							key={task.id}
							task={task}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Tasks;
