import { z } from 'zod'

export const createMoodSchema = z.object({
	date: z.string(),
	mood: z.string().min(1).max(128),
	user: z.string().min(1).max(32),
	feeling: z.string().max(5000).optional(),
})

export const moodSchema = createMoodSchema.extend({
	created_at: z.string(),
	id: z.number(),
})

export type Mood = z.infer<typeof moodSchema>
export type CreateMood = z.infer<typeof createMoodSchema>

export function formatDate(date: Date) {
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
	const day = String(date.getDate()).padStart(2, '0')
	return `${year}-${month}-${day}`
}

export const moods = {
	good: 'green',
	alright: 'yellow',
	bad: 'red',
}

export type MoodSelection = 'good' | 'alright' | 'bad'
