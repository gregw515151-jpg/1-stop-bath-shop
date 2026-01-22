-- Create drafts table for saving quote drafts
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.drafts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  data JSONB NOT NULL,
  email TEXT -- Optional, for future use or simple identification
);

-- Enable Row Level Security
ALTER TABLE public.drafts ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public access (since this is an internal tool)
CREATE POLICY "Enable read access for all users" 
  ON public.drafts 
  FOR SELECT 
  USING (true);

CREATE POLICY "Enable insert access for all users" 
  ON public.drafts 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Enable update access for all users" 
  ON public.drafts 
  FOR UPDATE 
  USING (true);

CREATE POLICY "Enable delete access for all users" 
  ON public.drafts 
  FOR DELETE 
  USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_drafts_created_at ON public.drafts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_drafts_name ON public.drafts(name);

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_drafts_updated_at 
  BEFORE UPDATE ON public.drafts 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
