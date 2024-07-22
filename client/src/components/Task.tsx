import * as React from 'react';

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/card';
import { Checkbox } from './ui/checkbox';

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
	const handleToggleCompleted = () => {
		console.log(`Task: ${task.description} marked as completed`);
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
				<p>Completed: {task.completed ? 'Yes' : 'No'} </p>
				<Checkbox
					checked={task.completed}
					className='ml-4'
					onCheckedChange={handleToggleCompleted}
				/>
			</CardFooter>
		</Card>
	);
};

export default Task;
