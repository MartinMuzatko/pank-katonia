import { z } from 'zod';

export const createMoodSchema = z.object({
	date: z.date(),
	mood: z.string().min(1).max(128),
	user: z.string().min(1).max(32),
	feeling: z.string().max(5000).optional(),
});

export const moodSchema = createMoodSchema.extend({
	created_at: z.date(),
	id: z.number(),
});

export type Mood = z.infer<typeof moodSchema>;
export type CreateMood = z.infer<typeof createMoodSchema>;
