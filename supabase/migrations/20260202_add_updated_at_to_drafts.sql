-- Add updated_at column to drafts table if it doesn't exist
-- Run this in your Supabase SQL Editor

-- Add the column
ALTER TABLE public.drafts 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Update existing rows to have updated_at = created_at
UPDATE public.drafts 
SET updated_at = created_at 
WHERE updated_at IS NULL;

-- Recreate the trigger function (in case it doesn't exist)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS update_drafts_updated_at ON public.drafts;

CREATE TRIGGER update_drafts_updated_at 
  BEFORE UPDATE ON public.drafts 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
