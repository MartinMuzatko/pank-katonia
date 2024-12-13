import { cookies } from 'next/headers';
import { MoodForm } from '@/components/MoodForm';
import { CreateMood, Mood } from '@/domain/mood';
import { createClient } from '@/utils/supabase/server';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';

export default async function HomePage() {
	const cookieStore = await cookies();
	const supabase = createClient(cookieStore);
	const { data: entries } = await supabase.from('entries').select();

	async function createMoodAction(form: CreateMood) {
		'use server';
		const cookieStore = await cookies();
		const supabase = createClient(cookieStore);
		await supabase.from('entries').insert(form);
	}

	return (
		<>
			<ColorSchemeToggle />
			<MoodForm {...{ createMoodAction }} />
		</>
	);
}
