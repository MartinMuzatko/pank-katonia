import { Mood, MoodSelection } from './mood'

type Streak = {
	mood: MoodSelection
	length: number
	startDate: string
	endDate: string
}

const sortByDate = (entries: Mood[]): Mood[] =>
	[...entries].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

const groupConsecutiveMoods = (entries: Mood[]): Streak[] =>
	sortByDate(entries).reduce((streaks: Streak[], entry) => {
		const lastStreak = streaks[streaks.length - 1]

		if (!lastStreak || lastStreak.mood !== entry.mood) {
			return [
				...streaks,
				{
					mood: entry.mood as MoodSelection,
					length: 1,
					startDate: entry.date,
					endDate: entry.date,
				},
			]
		}

		return [
			...streaks.slice(0, -1),
			{
				...lastStreak,
				length: lastStreak.length + 1,
				endDate: entry.date,
			},
		]
	}, [] as Streak[])

export const getLongestStreaks = (entries: Mood[]): Streak[] => {
	const streaks = groupConsecutiveMoods(entries)

	return ['good', 'alright', 'bad'].map((mood) => {
		const moodStreaks = streaks.filter((streak) => streak.mood === mood)
		const longestStreak = moodStreaks.reduce(
			(longest, current) => (current.length > longest.length ? current : longest),
			{ mood, length: 0, startDate: '', endDate: '' } as Streak
		)

		return longestStreak
	})
}
