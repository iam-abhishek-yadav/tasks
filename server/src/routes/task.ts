import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt';
import z from 'zod';
import { addDays, parseISO } from 'date-fns';

export const taskRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
	Variables: {
		userId: string;
	};
}>();

const createTaskInput = z.object({
	description: z.string(),
	dueDate: z.string().transform((val) => new Date(val)),
});

taskRouter.use('/*', async (c, next) => {
	try {
		c.set('userId', '3');
		await next();
	} catch (e) {
		console.error(e);
	}
});

taskRouter.get('/', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
	try {
		const tasks = await prisma.task.findMany();
		return c.json({ tasks });
	} catch (error) {
		console.error(error);
		c.status(500);
		return c.json({
			error: 'Internal Server Error',
		});
	} finally {
		await prisma.$disconnect();
	}
});

taskRouter.post('/', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
	try {
		const body = await c.req.json();
		const result = createTaskInput.safeParse(body);
		console.log(result);

		if (!result.success) {
			c.status(400);
			return c.json({
				message: 'Inputs not correct',
			});
		}
		const { data } = result;
		const userId = c.get('userId');
		if (!userId) {
			c.status(401);
			return c.json({
				error: 'Unauthorized',
			});
		}

		const originalDueDate = parseISO(body.dueDate);
		const updatedDueDate = addDays(originalDueDate, 1);

		const task = await prisma.task.create({
			data: {
				description: data.description,
				dueDate: updatedDueDate.toISOString(),
				userId: Number(userId),
				createdAt: new Date(),
			},
		});
		return c.json({
			task,
		});
	} catch (error) {
		console.error(error);
		c.status(500);
		return c.json({
			error: 'Internal Server Error',
		});
	} finally {
		await prisma.$disconnect();
	}
});

taskRouter.put('/toggle/:id', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const taskId = Number(c.req.param('id'));
		const userId = c.get('userId');

		if (!userId) {
			c.status(401);
			return c.json({
				error: 'Unauthorized',
			});
		}

		const task = await prisma.task.findUnique({
			where: { id: taskId },
		});

		if (!task) {
			c.status(404);
			return c.json({
				error: 'Task not found',
			});
		}

		if (task.userId !== Number(userId)) {
			c.status(403);
			return c.json({
				error: 'Forbidden',
			});
		}

		const updatedTask = await prisma.task.update({
			where: { id: taskId },
			data: {
				completed: !task.completed,
			},
		});

		return c.json({
			task: updatedTask,
		});
	} catch (error) {
		console.error(error);
		c.status(500);
		return c.json({
			error: 'Internal Server Error',
		});
	} finally {
		await prisma.$disconnect();
	}
});
