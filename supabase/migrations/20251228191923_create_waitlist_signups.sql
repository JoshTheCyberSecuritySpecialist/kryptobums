/*
  # Create waitlist_signups table

  1. New Tables
    - `waitlist_signups`
      - `id` (uuid, primary key) - Unique identifier for each signup
      - `email` (text, unique, required) - User's email address
      - `alias` (text, nullable) - Optional fighter alias/name
      - `source` (text, default "kryptobums") - Traffic source tracking
      - `created_at` (timestamptz, default now()) - Signup timestamp

  2. Security
    - Enable RLS on `waitlist_signups` table
    - Add policy for authenticated service to insert records
    - Add policy for authenticated service to read records
    
  3. Indexes
    - Index on email for fast duplicate checking
    - Index on created_at for chronological queries
*/

CREATE TABLE IF NOT EXISTS waitlist_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  alias text,
  source text DEFAULT 'kryptobums',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Policy for service role to insert records (Edge Functions use service role)
CREATE POLICY "Service can insert waitlist signups"
  ON waitlist_signups
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Policy for service role to read records
CREATE POLICY "Service can read waitlist signups"
  ON waitlist_signups
  FOR SELECT
  TO service_role
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist_signups(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist_signups(created_at DESC);