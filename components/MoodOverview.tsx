'use client'

import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { match, P } from 'ts-pattern'
import { Button, Chip, Flex } from '@mantine/core'
import { Calendar } from '@mantine/dates'
import { CreateMood, formatDate, Mood, moodColorMap, MoodSelection, User } from '@/domain/mood'
import { MoodForm } from './MoodForm'

type MoodOverviewProps = {
	createMoodAction: (createMood: CreateMood) => void
	entries: Mood[]
}

export const MoodOverview = ({ createMoodAction, entries }: MoodOverviewProps) => {
	const [selectedDate, setSelectedDate] = useState(formatDate(new Date()))
	const [visibleUsers, setVisibleUsers] = useState<User | 'both'>('both')

	useEffect(() => {
		const entry = entries.find(
			(e) => dayjs(selectedDate).isSame(e.date, 'day') && e.user === User.pank
		)
		// TODO set form values
	}, [selectedDate])
	return (
		<Flex gap={16} wrap="wrap" justify="center">
			<MoodForm
				{...{
					createMoodAction,
					entries,
					user: 'Pank',
					date: selectedDate,
				}}
			/>
			<div>
				<div className="flex justify-center gap-4 py-6">
					<Button.Group>
						<Button
							onClick={() => {
								setVisibleUsers(User.pank)
							}}
							variant={visibleUsers === User.pank ? 'filled' : 'default'}
						>
							Pank
						</Button>
						<Button
							onClick={() => {
								setVisibleUsers(User.katonia)
							}}
							variant={visibleUsers === User.katonia ? 'filled' : 'default'}
						>
							Katonia
						</Button>
						<Button
							onClick={() => {
								setVisibleUsers('both')
							}}
							variant={visibleUsers === 'both' ? 'filled' : 'default'}
						>
							Both
						</Button>
					</Button.Group>
				</div>
				<Calendar
					size="xl"
					highlightToday
					// date={new Date(date)}
					getDayProps={(date) => {
						const katoniaEntry = entries.find(
							(e) => dayjs(date).isSame(e.date, 'day') && e.user === User.katonia
						)
						const pankEntry = entries.find(
							(e) => dayjs(date).isSame(e.date, 'day') && e.user === User.pank
						)
						const katoniaColor =
							moodColorMap[katoniaEntry?.mood as MoodSelection] ?? 'gray'
						const pankColor = moodColorMap[pankEntry?.mood as MoodSelection] ?? 'gray'
						const isSameDayAsToday = dayjs(date).isSame(new Date(), 'day')
						const isSameDayAsSelected = dayjs(date).isSame(selectedDate, 'day')
						const className = match(visibleUsers)
							.with(User.katonia, () => `bg-${katoniaColor}-400`)
							.with(User.pank, () => `bg-${pankColor}-400`)
							.otherwise(
								() =>
									`bg-white bg-gradient-to-br from-${pankColor}-400 from-50% to-${katoniaColor}-400 to-50%`
							)
						return {
							style: {
								border:
									isSameDayAsToday || isSameDayAsSelected
										? '2px solid purple'
										: '',
							},
							className: entries.find((e) => dayjs(date).isSame(e.date, 'day'))
								? `text-black ${className} ${isSameDayAsToday ? 'border-blue' : ''}`
								: '',
							onClick: () => setSelectedDate(formatDate(date)),
						}
					}}
				/>
			</div>
			<MoodForm
				{...{
					createMoodAction,
					entries,
					user: 'Katonia',
					date: selectedDate,
				}}
			/>
		</Flex>
	)
}
