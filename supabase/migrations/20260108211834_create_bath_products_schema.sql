/*
  # Create Bath Products Schema

  1. New Tables
    - `bathtubs`
      - `id` (uuid, primary key)
      - `name` (text)
      - `price` (decimal)
      - `created_at` (timestamp)
    
    - `showers`
      - `id` (uuid, primary key)
      - `name` (text)
      - `price` (decimal)
      - `created_at` (timestamp)
    
    - `trim`
      - `id` (uuid, primary key)
      - `name` (text)
      - `price` (decimal)
      - `created_at` (timestamp)
    
    - `toilets`
      - `id` (uuid, primary key)
      - `name` (text)
      - `price` (decimal)
      - `created_at` (timestamp)
    
    - `sinks`
      - `id` (uuid, primary key)
      - `name` (text)
      - `price` (decimal)
      - `created_at` (timestamp)
    
    - `tiles`
      - `id` (uuid, primary key)
      - `name` (text)
      - `price` (decimal)
      - `created_at` (timestamp)
    
    - `labor_options`
      - `id` (uuid, primary key)
      - `name` (text)
      - `price` (decimal)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (since this is a product catalog)
*/

-- Create bathtubs table
CREATE TABLE IF NOT EXISTS bathtubs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price decimal(10,2) NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bathtubs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to bathtubs"
  ON bathtubs FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create showers table
CREATE TABLE IF NOT EXISTS showers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price decimal(10,2) NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE showers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to showers"
  ON showers FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create trim table
CREATE TABLE IF NOT EXISTS trim (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price decimal(10,2) NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE trim ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to trim"
  ON trim FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create toilets table
CREATE TABLE IF NOT EXISTS toilets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price decimal(10,2) NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE toilets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to toilets"
  ON toilets FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create sinks table
CREATE TABLE IF NOT EXISTS sinks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price decimal(10,2) NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE sinks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to sinks"
  ON sinks FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create tiles table
CREATE TABLE IF NOT EXISTS tiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price decimal(10,2) NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to tiles"
  ON tiles FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create labor_options table
CREATE TABLE IF NOT EXISTS labor_options (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price decimal(10,2) NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE labor_options ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to labor_options"
  ON labor_options FOR SELECT
  TO anon, authenticated
  USING (true);