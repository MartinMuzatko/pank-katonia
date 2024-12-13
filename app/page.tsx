import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { MoodForm } from '@/components/MoodForm';
import { CreateMood, formatDate, Mood } from '@/domain/mood';
import { createClient } from '@/utils/supabase/server';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';

export default async function HomePage() {
	const cookieStore = await cookies();
	const supabase = createClient(cookieStore);
	const { data: entries } = await supabase.from('entries').select<'*', Mood>('*');
	const { data: match } = await supabase
		.from('entries')
		.select()
		.match({
			user: 'Pank',
			date: formatDate(new Date()),
		})
		.single();

	async function createMoodAction(form: CreateMood) {
		'use server';
		const cookieStore = await cookies();
		const supabase = createClient(cookieStore);
		const { data: entries } = await supabase.from('entries').select<'*', Mood>('*');
		await supabase.from('entries').select().match({
			user: form.user,
			date: form.date,
		});
		const existingEntry = entries?.find((e) => e.date == form.date && e.user == form.user);

		existingEntry
			? await supabase.from('entries').update({ ...existingEntry, ...form })
			: await supabase.from('entries').insert(form);
		revalidatePath('/');
	}
	return (
		<>
			{entries && <MoodForm {...{ createMoodAction, entries }} />}
			<ColorSchemeToggle />
			{JSON.stringify(match)}
		</>
	);
}
