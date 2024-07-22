import * as React from 'react';
import { format, isBefore, isSameDay } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { toZonedTime } from 'date-fns-tz';
import { FaPlus } from 'react-icons/fa';

import { cn } from '../lib/utils';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

import { API_URL } from '../config';

interface Task {
	description: string;
	dueDate: string;
	userId: number;
}

const AddTask = ({
	setTasks,
}: {
	setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) => {
	const [description, setDescription] = React.useState('');
	const [date, setDate] = React.useState<Date | undefined>();
	const [isOpen, setIsOpen] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	const handleDateSelect = (selectedDate: Date | undefined) => {
		if (selectedDate) {
			const istDate = toZonedTime(selectedDate, 'Asia/Kolkata');
			const now = new Date();
			const istNow = toZonedTime(now, 'Asia/Kolkata');
			if (!isBefore(istDate, istNow) || isSameDay(istDate, istNow)) {
				setDate(selectedDate);
			} else {
				alert('You cannot select a date before today.');
			}
		}
	};

	const handleAddTask = async () => {
		if (description && date) {
			setLoading(true);
			setError(null);

			try {
				const response = await fetch(`${API_URL}/api/v1/tasks`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						description,
						dueDate: date.toISOString(),
						userId: 3,
					}),
				});

				if (response.status === 200) {
					const newTask = await response.json();

					setTasks((prevTasks) => [...prevTasks, newTask.task]);

					setDescription('');
					setDate(undefined);
					setIsOpen(false);
				} else {
					throw new Error('Failed to add task');
				}
			} catch (err: any) {
				setError('Error adding task. Please try again later.');
				console.error('Error adding task:', err.message);
			} finally {
				setLoading(false);
			}
		} else {
			alert('Please enter a task description and select a valid date.');
		}
	};

	return (
		<React.Fragment>
			<Button
				type='button'
				className='bg-white text-black'
				onClick={() => setIsOpen(true)}>
				<FaPlus className='mr-2' />
				Add
			</Button>

			{isOpen && (
				<Dialog open={isOpen}>
					<DialogContent className='bg-slate-900 max-h-screen overflow-y-auto'>
						<DialogHeader>
							<DialogTitle className='text-white'>Add a task</DialogTitle>
						</DialogHeader>
						<DialogDescription>
							<Textarea
								placeholder='Add task description'
								className='bg-slate-300 text-black mt-4 max-h-[400px]'
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</DialogDescription>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant='outline'
									className={cn(
										'w-[280px] justify-start text-left font-normal',
										!date && 'text-muted-foreground'
									)}>
									<CalendarIcon className='mr-2 h-4 w-4' />
									{date ? format(date, 'PPP') : <span>Pick a date</span>}
								</Button>
							</PopoverTrigger>
							<PopoverContent className='w-auto p-0'>
								<Calendar
									mode='single'
									selected={date}
									onSelect={handleDateSelect}
									initialFocus
								/>
							</PopoverContent>
						</Popover>
						<DialogFooter>
							<Button
								type='button'
								onClick={handleAddTask}
								className='bg-white text-black'
								disabled={loading}>
								Add
							</Button>
							<Button
								type='button'
								onClick={() => {
									setDescription('');
									setDate(undefined);
									setIsOpen(false);
								}}
								className='bg-white text-black'>
								Cancel
							</Button>
						</DialogFooter>
						{error && <p className='text-red-500'>{error}</p>}
					</DialogContent>
				</Dialog>
			)}
		</React.Fragment>
	);
};

export default AddTask;
