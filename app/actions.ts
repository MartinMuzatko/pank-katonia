'use server'

import { CreateMood } from '@/domain/mood'
import { SupabaseClient } from '@/utils/supabase/server'

export async function createMoodAction(supabase: SupabaseClient, form: CreateMood) {
	console.log('Hi from console!')
	console.log(form)
}
