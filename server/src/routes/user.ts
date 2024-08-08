import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign, decode, verify } from 'hono/jwt';
import z from 'zod';
import { hash, compare } from 'bcrypt-ts';

export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
	Variables: {
		userId: string;
	};
}>();

const signupInput = z.object({
	username: z.string().email(),
	password: z.string().min(6),
	name: z.string(),
});

const signinInput = z.object({
	username: z.string().email(),
	password: z.string().min(6),
});

userRouter.post('/signup', async (c) => {
	const body = await c.req.json();
	const { success } = signupInput.safeParse(body);
	if (!success) {
		c.status(411);
		return c.json({
			message: 'Inputs not correct',
		});
	}
	try {
		const prisma = new PrismaClient({
			datasourceUrl: c.env.DATABASE_URL,
		}).$extends(withAccelerate());
		const hashedPassword = await hash(body.password, 10);
		const user = await prisma.user.create({
			data: {
				username: body.username,
				password: hashedPassword,
				name: body.name,
			},
		});

		const jwt = await sign(
			{
				id: user.id,
			},
			c.env.JWT_SECRET
		);

		return c.json({ token: jwt });
	} catch (e) {
		console.log(e);
		c.status(411);
		return c.text('Invalid');
	}
});

userRouter.post('/signin', async (c) => {
	const body = await c.req.json();
	const { success } = signinInput.safeParse(body);
	if (!success) {
		c.status(411);
		return c.json({
			message: 'Inputs not correct',
		});
	}
	try {
		const prisma = new PrismaClient({
			datasourceUrl: c.env.DATABASE_URL,
		}).$extends(withAccelerate());

		const user = await prisma.user.findUnique({
			where: {
				username: body.username,
			},
		});

		if (!user || !(await compare(body.password, user.password))) {
			c.status(403);
			return c.json({ error: 'User not found or incorrect password' });
		}

		if (!user) {
			c.status(403);
			return c.json({ error: 'user not found' });
		}
		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({ token: jwt });
	} catch (e) {
		console.log(e);
		c.status(500);
		return c.json({ error: 'Internal Server Error' });
	}
});

userRouter.get('/', async (c) => {
	try {
		const token = c.req.header('authorization');

		if (!token) {
			c.status(401);
			return c.json({ error: 'Authorization token is missing' });
		}

		const userId = await decode(token).payload.id;
		console.log(userId);
		if (!userId) {
			c.status(404);
			return c.json({ error: 'User not logged in' });
		}

		const prisma = new PrismaClient({
			datasourceUrl: c.env.DATABASE_URL,
		}).$extends(withAccelerate());

		const user = await prisma.user.findUnique({
			where: { id: Number(userId) },
			select: {
				id: true,
				name: true,
				username: true,
				Tasks: true,
			},
		});

		if (!user) {
			c.status(404);
			return c.json({ error: 'User not found' });
		}

		return c.json({ user });
	} catch (error) {
		console.error('Error:', error);
		c.status(500);
		return c.json({ error: 'Internal Server Error' });
	}
});
