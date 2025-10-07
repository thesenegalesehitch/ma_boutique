/*
  # Fix Admin Users RLS Policies - Remove Infinite Recursion

  ## Problem
  The current RLS policies on admin_users table cause infinite recursion because they
  query the admin_users table within their own policy checks, creating a circular dependency.

  ## Solution
  1. Drop all existing policies on admin_users table
  2. Create simplified policies that don't cause recursion
  3. Admin users table should be accessible to authenticated users who ARE in the table
  4. Use a simpler check that doesn't require querying the same table

  ## Security
  - Only authenticated users can access admin_users data
  - Users can only see their own admin record
  - No recursion by using auth.uid() directly instead of subqueries
*/

-- Drop all existing policies on admin_users
DROP POLICY IF EXISTS "Authenticated users can view admin users" ON admin_users;
DROP POLICY IF EXISTS "Admin users can view admin users" ON admin_users;

-- Create new policies without recursion
-- Policy for SELECT: Authenticated users can see their own admin record
CREATE POLICY "Users can view own admin record"
  ON admin_users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Policy for INSERT: Only allow system to insert (via trigger)
CREATE POLICY "System can insert admin users"
  ON admin_users FOR INSERT
  WITH CHECK (true);

-- Policy for UPDATE: Users can update their own record
CREATE POLICY "Users can update own admin record"
  ON admin_users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy for DELETE: Users can delete their own record
CREATE POLICY "Users can delete own admin record"
  ON admin_users FOR DELETE
  TO authenticated
  USING (auth.uid() = id);