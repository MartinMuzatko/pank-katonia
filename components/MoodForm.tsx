'use client'

import dayjs from 'dayjs'
import { useActionState, useEffect, useMemo } from 'react'
import { IconCheck } from '@tabler/icons-react'
import { Button, ColorSwatch, Group, Select, SelectProps, Stack, Textarea } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { Form, useForm, zodResolver } from '@mantine/form'
import { CreateMood, createMoodSchema, formatDate, Mood, MoodSelection } from '@/domain/mood'

const resolvedSchema = zodResolver(createMoodSchema)

const renderSelectOption: SelectProps['renderOption'] = ({ option, checked }) => (
	<Group flex="1" gap="xs">
		<ColorSwatch
			component="button"
			size={20}
			color={moods[option.value as MoodSelection] ?? 'green'}
			style={{ color: '#fff' }}
		>
			{checked && <IconCheck style={{ marginInlineStart: 'auto' }} color="black" />}
		</ColorSwatch>
		{option.value}
	</Group>
)

const moods = {
	good: 'green',
	alright: 'yellow',
	bad: 'red',
}

type MoodFormProps = {
	createMoodAction: (createMood: CreateMood) => void
	entries: Mood[]
	user: string
	date: string
}

const endearments = [
	'honey',
	'sweetie',
	'sugarcube',
	'darling',
	'sweetheart',
	'dear',
	'lovely',
	'cuddlebug',
]

export const MoodForm = ({ createMoodAction, entries, user, date }: MoodFormProps) => {
	const randomEndearment = useMemo(
		() => endearments[Math.floor(Math.random() * endearments.length)],
		[]
	)
	const initialValues = {
		date,
		user,
		mood: '',
		feeling: '',
	}
	// const [state, formAction, pending] = useActionState(createMoodAction)

	const form = useForm({
		mode: 'controlled',
		validate: resolvedSchema,
		initialValues,
	})

	const existingEntry = entries.find((e) => e.date === date && e.user === user)

	useEffect(() => {
		const entry = entries.find((e) => dayjs(date).isSame(e.date, 'day') && e.user === user)
		form.setValues(
			entry
				? { ...form.values, ...entry, feeling: entry.feeling ?? '', date }
				: { ...initialValues, date }
		)
	}, [date])
	return (
		<Form
			className="mt-16"
			form={form}
			onSubmit={(form) => {
				// setShowForm(false);
				createMoodAction(form)
			}}
		>
			<Stack gap={8}>
				<h3 className="text-lg">
					Hi <span className="font-bold">{user}</span>, {randomEndearment}! :3
				</h3>
				<Select
					leftSection={
						<ColorSwatch
							component="button"
							size={20}
							color={
								form.values.mood === ''
									? 'transparent'
									: moods[form.values.mood as MoodSelection]
							}
							style={{ color: '#fff' }}
						/>
					}
					label="How are you feeling today?"
					allowDeselect
					placeholder="pick mood"
					{...form.getInputProps('mood')}
					value={form.values.mood === '' ? null : form.values.mood}
					data={['good', 'alright', 'bad']}
					renderOption={renderSelectOption}
				/>
				<Textarea label="What's on your mind today?" {...form.getInputProps('feeling')} />
				<Button type="submit">{existingEntry ? 'Update' : 'Submit'}</Button>
			</Stack>
		</Form>
	)
}
