import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yljfijavihyielwxzqyn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsamZpamF2aWh5aWVsd3h6cXluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NTk0NDEsImV4cCI6MjA2MDIzNTQ0MX0.WjDGSWH75DJfeGq38Gtlws9H694dm20iDxAX2xNEwA0'
export const supabase = createClient(supabaseUrl, supabaseKey)
