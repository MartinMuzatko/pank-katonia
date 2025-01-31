'use client'

import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { match } from 'ts-pattern'
import { Flex } from '@mantine/core'
import { Calendar } from '@mantine/dates'
import { CreateMood, formatDate, Mood, moods, MoodSelection, User } from '@/domain/mood'
import { MoodForm } from './MoodForm'

type MoodOverviewProps = {
	createMoodAction: (createMood: CreateMood) => void
	entries: Mood[]
}

export const MoodOverview = ({ createMoodAction, entries }: MoodOverviewProps) => {
	const [selectedDate, setSelectedDate] = useState(formatDate(new Date()))

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
					const katoniaColor = moods[katoniaEntry?.mood as MoodSelection] ?? 'gray'
					const pankColor = moods[pankEntry?.mood as MoodSelection] ?? 'gray'
					const isSameDayAsToday = dayjs(date).isSame(new Date(), 'day')
					const isSameDayAsSelected = dayjs(date).isSame(selectedDate, 'day')
					return {
						style: {
							border:
								isSameDayAsToday || isSameDayAsSelected ? '2px solid purple' : '',
						},
						className: entries.find((e) => dayjs(date).isSame(e.date, 'day'))
							? `bg-white bg-gradient-to-br from-${pankColor}-400 from-50% to-${katoniaColor}-400 to-50% text-black ${isSameDayAsToday ? 'border-blue' : ''}`
							: '',
						onClick: () => setSelectedDate(formatDate(date)),
					}
				}}
			/>
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
