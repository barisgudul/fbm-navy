-- Multi-Category Listing System - SQL Migration
-- Run this in Supabase SQL Editor BEFORE deploying the frontend changes

-- Step 1: Add new columns
ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'konut',
  ADD COLUMN IF NOT EXISTS zoning_status TEXT,
  ADD COLUMN IF NOT EXISTS ada TEXT,
  ADD COLUMN IF NOT EXISTS parsel TEXT,
  ADD COLUMN IF NOT EXISTS kaks NUMERIC,
  ADD COLUMN IF NOT EXISTS taks NUMERIC,
  ADD COLUMN IF NOT EXISTS gabari TEXT,
  ADD COLUMN IF NOT EXISTS tapu_durumu TEXT,
  ADD COLUMN IF NOT EXISTS kredi_uygunluk BOOLEAN;

-- Step 2: Make residential fields nullable (they may already be nullable)
-- These ALTER statements will fail silently if columns are already nullable
DO $$
BEGIN
  BEGIN
    ALTER TABLE properties ALTER COLUMN rooms DROP NOT NULL;
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
  
  BEGIN
    ALTER TABLE properties ALTER COLUMN living_rooms DROP NOT NULL;
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
  
  BEGIN
    ALTER TABLE properties ALTER COLUMN bathrooms DROP NOT NULL;
  EXCEPTION WHEN OTHERS THEN NULL;
  END;
END $$;

-- Step 3: Add constraint for category values
ALTER TABLE properties
  ADD CONSTRAINT check_category 
  CHECK (category IN ('konut', 'arsa'));

-- Step 4: Create index for category filtering performance
CREATE INDEX IF NOT EXISTS idx_properties_category ON properties(category);

-- Step 5: Update existing records to have 'konut' category (if not already set)
UPDATE properties SET category = 'konut' WHERE category IS NULL;

-- Verification query: Check the schema changes
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'properties'
ORDER BY ordinal_position;
