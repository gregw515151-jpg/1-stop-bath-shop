-- Run this in your Supabase SQL Editor to create the drafts table

CREATE TABLE IF NOT EXISTS drafts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  data JSONB NOT NULL,
  email TEXT -- Optional, for future use or simple identification
);

-- Enable Row Level Security (RLS) is generally good practice, 
-- but for this simple internal tool, we might want to allow public access 
-- if you haven't set up Auth yet. 
-- UNCOMMENT THE LINES BELOW IF YOU WANT TO ALLOW ANYONE TO READ/WRITE (Simplest for now)

ALTER TABLE drafts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON drafts FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON drafts FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON drafts FOR UPDATE USING (true);
