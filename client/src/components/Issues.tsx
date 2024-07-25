import { useEffect, useState } from 'react';
import axios from 'axios';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/card';

interface GitHubIssue {
	id: number;
	title: string;
	body: string;
	number: number;
	html_url: string;
}

const Issues = () => {
	const [issues, setIssues] = useState<GitHubIssue[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchIssues = async () => {
			try {
				const response = await axios.get<GitHubIssue[]>(
					'https://api.github.com/repos/iam-abhishek-yadav/tasks/issues'
				);
				setIssues(response.data);
			} catch (error) {
				if (axios.isAxiosError(error)) {
					setError(error.message);
				} else {
					setError('An unexpected error occurred');
				}
			} finally {
				setLoading(false);
			}
		};

		fetchIssues();
	}, []);

	if (loading) {
		return <div className='text-center text-lg font-semibold'>Loading...</div>;
	}

	if (error) {
		return (
			<div className='text-center text-lg text-red-500'>Error: {error}</div>
		);
	}

	return (
		<div className='p-6 bg-gray-800 rounded-lg shadow-md'>
			<h1 className='text-2xl font-bold mb-4 text-white'>Issues</h1>
			<div className='max-h-[86vh] overflow-y-auto space-y-4 p-4'>
				{issues.map((issue) => (
					<a
						key={issue.id}
						href={issue.html_url}
						target='_blank'
						rel='noopener noreferrer'
						className='block'>
						<Card className='bg-white rounded-md shadow-sm'>
							<CardHeader>
								<CardTitle className='text-xl font-semibold'>
									{issue.title}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-gray-700'>{issue.body}</p>
							</CardContent>
							<CardFooter>
								<p className='text-gray-500'>#{issue.number}</p>
							</CardFooter>
						</Card>
					</a>
				))}
			</div>
		</div>
	);
};

export default Issues;
