'use client';

import { useState } from 'react';
import { Button, Flex, Select, Stack, Textarea } from '@mantine/core';
import { Calendar, DatePickerInput } from '@mantine/dates';
import { Form, useForm, zodResolver } from '@mantine/form';
import { CreateMood, createMoodSchema } from '@/domain/mood';

type MoodFormProps = {
	createMoodAction: (createMood: CreateMood) => void;
};

const resolvedSchema = zodResolver(createMoodSchema);
export const MoodForm = ({ createMoodAction }: MoodFormProps) => {
	const [showForm, setShowForm] = useState(true);
	const form = useForm({
		mode: 'controlled',
		validate: resolvedSchema,
		initialValues: {
			date: new Date(),
			user: 'Pank',
			mood: 'good',
		},
	});
	return (
		<Flex gap={16}>
			<Calendar size="xl" highlightToday />
			{showForm && (
				<Form
					form={form}
					onSubmit={(form) => {
						// setShowForm(false);
						createMoodAction(form);
					}}
				>
					<Stack gap={8}>
						<Select
							{...form.getInputProps('user')}
							data={['Pank', 'Katonia']}
							defaultValue="Pank"
							label="Hi, sweetie!"
						/>
						<DatePickerInput label="Date" {...form.getInputProps('date')} />
						<Select
							{...form.getInputProps('mood')}
							label="How are you feeling today?"
							data={['bad', 'meh', 'good']}
						/>
						<Textarea
							{...form.getInputProps('feeling')}
							label="What's on your mind today? :3"
						/>
						<Button type="submit">Submit</Button>
					</Stack>
				</Form>
			)}
		</Flex>
	);
};
