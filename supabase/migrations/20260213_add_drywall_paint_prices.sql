-- Add default price columns for Drywall & Paint and Trim sections
-- Run this in your Supabase SQL Editor

ALTER TABLE public.company_settings
ADD COLUMN IF NOT EXISTS drywall_linear_price NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS drywall_sheet_price NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS paint_linear_price NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS trim_casing_price NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS trim_baseboard_price NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS trim_qtr_round_price NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS trim_door_price NUMERIC DEFAULT 0;
