'use client';

import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { IconCheck } from '@tabler/icons-react';
import {
	Button,
	ColorSwatch,
	Flex,
	Group,
	Select,
	SelectProps,
	Stack,
	Textarea,
} from '@mantine/core';
import { Calendar, DatePickerInput } from '@mantine/dates';
import { Form, useForm, zodResolver } from '@mantine/form';
import { CreateMood, createMoodSchema, formatDate, Mood } from '@/domain/mood';

const resolvedSchema = zodResolver(createMoodSchema);

const capitalize = (str: string) => str.slice(0, 1).toUpperCase() + str.slice(1);

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
);

type MoodSelection = 'good' | 'alright' | 'bad';

const moods = {
	good: 'green',
	alright: 'yellow',
	bad: 'red',
};

type MoodFormProps = {
	createMoodAction: (createMood: CreateMood) => void;
	entries: Mood[];
};

const initialValues = {
	date: formatDate(new Date()),
	user: 'Pank',
	mood: '',
	feeling: '',
};

export const MoodForm = ({ createMoodAction, entries }: MoodFormProps) => {
	const form = useForm({
		mode: 'controlled',
		validate: resolvedSchema,
		initialValues,
	});

	useEffect(() => {
		const entry = entries.find(
			(e) => dayjs(form.values.date).isSame(e.date, 'day') && e.user === form.values.user
		);
		form.setValues(
			entry
				? { ...form.values, ...entry }
				: { ...initialValues, date: form.values.date, mood: '' }
		);
	}, [form.values.date]);
	return (
		<Flex gap={16} justify="center">
			<Calendar
				size="xl"
				highlightToday
				date={new Date(form.values.date)}
				getDayProps={(date) => {
					const katoniaEntry = entries.find(
						(e) => dayjs(date).isSame(e.date, 'day') && e.user === 'Katonia'
					);
					const pankEntry = entries.find(
						(e) => dayjs(date).isSame(e.date, 'day') && e.user === 'Pank'
					);
					const katoniaColor = moods[katoniaEntry?.mood as MoodSelection];
					const pankColor = moods[pankEntry?.mood as MoodSelection];
					return {
						className: entries.find((e) => dayjs(date).isSame(e.date, 'day'))
							? `bg-white bg-gradient-to-tr from-${pankColor}-400 from-50% to-${katoniaColor}-400 to-50% text-black`
							: '',
						onClick: () => form.setFieldValue('date', formatDate(date)),
					};
				}}
			/>
			<Form
				className="mt-16"
				form={form}
				onSubmit={(form) => {
					// setShowForm(false);
					createMoodAction(form);
				}}
			>
				<Stack gap={8}>
					<Select
						allowDeselect
						label="Hi, sweetie!"
						{...form.getInputProps('user')}
						data={['Pank', 'Katonia']}
						defaultValue="Pank"
					/>
					<DatePickerInput
						label="Date"
						{...form.getInputProps('date')}
						value={new Date(form.values.date)}
						onChange={(value) =>
							form.setFieldValue('date', formatDate(value ?? new Date()))
						}
					/>
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
						{...form.getInputProps('mood')}
						data={['good', 'alright', 'bad']}
						renderOption={renderSelectOption}
					/>
					<Textarea
						label="What's on your mind today?"
						{...form.getInputProps('feeling')}
					/>
					<Button type="submit">Submit</Button>
				</Stack>
			</Form>
		</Flex>
	);
};
