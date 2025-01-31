import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { MoodOverview } from '@/components/MoodOverview'
import { MoodStatistics } from '@/components/MoodStatistics'
import { CreateMood, Mood } from '@/domain/mood'
import { createClient } from '@/utils/supabase/server'
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle'

export default async function HomePage() {
	const cookieStore = await cookies()
	const supabase = createClient(cookieStore)
	const { data: entries } = await supabase.from('entries').select<'*', Mood>('*')

	async function createMoodAction(form: CreateMood) {
		'use server'
		const cookieStore = await cookies()
		const supabase = createClient(cookieStore)
		const { data: existingEntry } = await supabase
			.from('entries')
			.select()
			.match({
				user: form.user,
				date: form.date,
			})
			.single()
		existingEntry
			? await supabase
					.from('entries')
					.update({ ...existingEntry, ...form })
					.eq('id', existingEntry.id)
			: await supabase.from('entries').insert(form)
		revalidatePath('/')
	}
	return (
		<>
			{entries && <MoodOverview {...{ createMoodAction, entries }} />}
			{entries && <MoodStatistics {...{ entries }} />}
			<ColorSchemeToggle />
		</>
	)
}
