/*
  # Simplify Admin Access - Complete Rewrite

  ## Problem
  Complex RLS policies causing authentication issues and recursion

  ## Solution
  1. Drop all existing policies and triggers
  2. Create a simple admin check that doesn't cause recursion
  3. Store admin emails in a simple way
  4. Use service role or anon key appropriately

  ## Changes
  1. Drop all admin_users policies
  2. Recreate admin_users table structure
  3. Add simple, non-recursive policies
  4. Ensure admin user is properly set up
*/

-- Drop all existing policies on admin_users
DROP POLICY IF EXISTS "Users can view own admin record" ON admin_users;
DROP POLICY IF EXISTS "System can insert admin users" ON admin_users;
DROP POLICY IF EXISTS "Users can update own admin record" ON admin_users;
DROP POLICY IF EXISTS "Users can delete own admin record" ON admin_users;

-- Drop and recreate admin_users table to ensure clean state
DROP TABLE IF EXISTS admin_users CASCADE;

CREATE TABLE admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create simple policies that allow authenticated users to check if they are admin
-- Key: Use simple auth.uid() check without subqueries to avoid recursion

CREATE POLICY "Allow authenticated users to read admin_users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow insert for system"
  ON admin_users FOR INSERT
  WITH CHECK (true);

-- Insert admin user
INSERT INTO admin_users (id, email)
VALUES ('a004fc3e-4091-4417-81cd-56431584bd4e', 'admin@boutique-sn.com')
ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;

-- Update all other tables' policies to use simpler admin check
-- Products policies
DROP POLICY IF EXISTS "Authenticated users can insert products" ON products;
DROP POLICY IF EXISTS "Authenticated users can update products" ON products;
DROP POLICY IF EXISTS "Authenticated users can delete products" ON products;

CREATE POLICY "Admin users can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() IN (SELECT id FROM admin_users)
  );

CREATE POLICY "Admin users can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (
    auth.uid() IN (SELECT id FROM admin_users)
  )
  WITH CHECK (
    auth.uid() IN (SELECT id FROM admin_users)
  );

CREATE POLICY "Admin users can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (
    auth.uid() IN (SELECT id FROM admin_users)
  );

-- Orders policies
DROP POLICY IF EXISTS "Authenticated users can view orders" ON orders;
DROP POLICY IF EXISTS "Authenticated users can update orders" ON orders;
DROP POLICY IF EXISTS "Authenticated users can delete orders" ON orders;

CREATE POLICY "Admin users can view orders"
  ON orders FOR SELECT
  TO authenticated
  USING (
    auth.uid() IN (SELECT id FROM admin_users)
  );

CREATE POLICY "Admin users can update orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (
    auth.uid() IN (SELECT id FROM admin_users)
  )
  WITH CHECK (
    auth.uid() IN (SELECT id FROM admin_users)
  );

CREATE POLICY "Admin users can delete orders"
  ON orders FOR DELETE
  TO authenticated
  USING (
    auth.uid() IN (SELECT id FROM admin_users)
  );

-- Site content policies
DROP POLICY IF EXISTS "Authenticated users can insert site content" ON site_content;
DROP POLICY IF EXISTS "Authenticated users can update site content" ON site_content;
DROP POLICY IF EXISTS "Authenticated users can delete site content" ON site_content;

CREATE POLICY "Admin users can insert site content"
  ON site_content FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() IN (SELECT id FROM admin_users)
  );

CREATE POLICY "Admin users can update site content"
  ON site_content FOR UPDATE
  TO authenticated
  USING (
    auth.uid() IN (SELECT id FROM admin_users)
  )
  WITH CHECK (
    auth.uid() IN (SELECT id FROM admin_users)
  );

CREATE POLICY "Admin users can delete site content"
  ON site_content FOR DELETE
  TO authenticated
  USING (
    auth.uid() IN (SELECT id FROM admin_users)
  );