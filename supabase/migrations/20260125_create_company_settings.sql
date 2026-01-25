-- Create company_settings table to sync info across devices
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.company_settings (
  id TEXT PRIMARY KEY DEFAULT 'default', -- We usually only need one record
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  company_name TEXT NOT NULL DEFAULT '1 Stop Bath Shop',
  address TEXT,
  mhic TEXT,
  phone TEXT,
  email TEXT,
  terms TEXT
);

-- Enable Row Level Security
ALTER TABLE public.company_settings ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public access (since this is an internal tool)
CREATE POLICY "Enable read access for all users" 
  ON public.company_settings 
  FOR SELECT 
  USING (true);

CREATE POLICY "Enable insert access for all users" 
  ON public.company_settings 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Enable update access for all users" 
  ON public.company_settings 
  FOR UPDATE 
  USING (true);

-- Add trigger for updated_at
CREATE TRIGGER update_company_settings_updated_at 
  BEFORE UPDATE ON public.company_settings 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Seed the initial record
INSERT INTO public.company_settings (id, company_name)
VALUES ('default', '1 Stop Bath Shop')
ON CONFLICT (id) DO NOTHING;
