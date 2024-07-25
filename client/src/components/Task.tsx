import * as React from 'react';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/card';
import { Checkbox } from './ui/checkbox';
import { API_URL } from '../config';

interface TaskProps {
	task: {
		id: number;
		description: string;
		createdAt: string;
		dueDate: string;
		completed: boolean;
	};
}

const Task: React.FC<TaskProps> = ({ task }) => {
	const [completed, setCompleted] = React.useState(task.completed);

	const handleToggleCompleted = async () => {
		try {
			const response = await fetch(
				`${API_URL}/api/v1/tasks/toggle/${task.id}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ completed: !completed }),
				}
			);

			if (!response.ok) {
				throw new Error('Failed to toggle task');
			}

			const updatedTask = await response.json();
			setCompleted(updatedTask.task.completed);
		} catch (error) {
			console.error('Error toggling task:', error);
		}
	};

	return (
		<Card className='bg-slate-800'>
			<CardHeader>
				<CardTitle>{task.description}</CardTitle>
			</CardHeader>
			<CardContent>
				<p>Created At: {task.createdAt}</p>
				<p>Due Date: {task.dueDate}</p>
			</CardContent>
			<CardFooter>
				<p>Completed: {completed ? 'Yes' : 'No'} </p>
				<Checkbox
					checked={completed}
					className='ml-4'
					onCheckedChange={handleToggleCompleted}
				/>
			</CardFooter>
		</Card>
	);
};

export default Task;
