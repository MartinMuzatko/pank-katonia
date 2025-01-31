'use client'

import { BarChart } from '@mantine/charts'
import { Mood, User } from '@/domain/mood'
import { getLongestStreaks } from '@/domain/statistics'

type MoodStatisticsProps = {
	entries: Mood[]
}

const getMoodTypeStatistics = (entries: Mood[]) => ({
	good: entries.filter((entry) => entry.mood === 'good').length,
	alright: entries.filter((entry) => entry.mood === 'alright').length,
	bad: entries.filter((entry) => entry.mood === 'bad').length,
})

const data = [
	{ month: 'January', Smartphones: 1200, Laptops: 900, Tablets: 200 },
	{ month: 'February', Smartphones: 1900, Laptops: 1200, Tablets: 400 },
	{ month: 'March', Smartphones: 400, Laptops: 1000, Tablets: 200 },
	{ month: 'April', Smartphones: 1000, Laptops: 200, Tablets: 800 },
	{ month: 'May', Smartphones: 800, Laptops: 1400, Tablets: 1200 },
	{ month: 'June', Smartphones: 750, Laptops: 600, Tablets: 1000 },
]

export const MoodStatistics = (props: MoodStatisticsProps) => {
	const pankEntries = props.entries.filter((entry) => entry.user === User.pank)
	const katoniaEntries = props.entries.filter((entry) => entry.user === User.katonia)
	const streaks = {
		pank: { streaks: getLongestStreaks(pankEntries), user: User.pank },
		katonia: { streaks: getLongestStreaks(katoniaEntries), user: User.katonia },
	}
	const statistics = {
		total: {
			pank: { ...getMoodTypeStatistics(pankEntries), user: User.pank },
			katonia: { ...getMoodTypeStatistics(katoniaEntries), user: User.katonia },
		},
		streaks: {
			pank: {
				good: streaks.pank.streaks[0].length,
				alright: streaks.pank.streaks[1].length,
				bad: streaks.pank.streaks[2].length,
				user: User.pank,
			},
			katonia: {
				good: streaks.katonia.streaks[0].length,
				alright: streaks.katonia.streaks[1].length,
				bad: streaks.katonia.streaks[2].length,
				user: User.katonia,
			},
		},
	}
	return (
		<div className="flex justify-center">
			<div className="w-1/2 m-16">
				<h2 className="text-xl font-bold">Statistics</h2>
				<h3 className="text-lg my-4">Overview # of moods</h3>
				<BarChart
					h={16 * 10}
					type="stacked"
					orientation="vertical"
					withLegend
					data={[statistics.total.pank, statistics.total.katonia]}
					dataKey="user"
					series={[
						{ name: 'good', color: 'green.6' },
						{ name: 'alright', color: 'yellow.6' },
						{ name: 'bad', color: 'red.6' },
					]}
					tickLine="y"
				/>
				<h3 className="text-lg my-4">Longest streaks of moods</h3>
				<BarChart
					h={16 * 10}
					type="stacked"
					orientation="vertical"
					withLegend
					data={[statistics.streaks.pank, statistics.streaks.katonia]}
					dataKey="user"
					series={[
						{ name: 'good', color: 'green.6' },
						{ name: 'alright', color: 'yellow.6' },
						{ name: 'bad', color: 'red.6' },
					]}
					tickLine="y"
				/>
			</div>
		</div>
	)
}
