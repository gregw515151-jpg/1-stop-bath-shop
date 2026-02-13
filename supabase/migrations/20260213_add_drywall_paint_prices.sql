-- Add default price columns for Drywall & Paint section
-- Run this in your Supabase SQL Editor

ALTER TABLE public.company_settings
ADD COLUMN IF NOT EXISTS drywall_linear_price NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS drywall_sheet_price NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS paint_linear_price NUMERIC DEFAULT 0;
