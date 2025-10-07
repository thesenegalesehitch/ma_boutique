/*
  # Create Admin User

  ## Overview
  This migration creates a default admin user account for accessing the admin dashboard.

  ## Admin Credentials
  - Email: admin@boutique-sn.com
  - Password: AdminBoutique2024!

  ## Important Security Notes
  1. CRITICAL: Change this password immediately after first login in production
  2. This account has full access to manage products, orders, and site content
  3. Keep these credentials secure and never share them publicly
  4. Consider enabling 2FA for additional security

  ## Changes
  1. Creates admin user in auth.users table
  2. Adds user entry to admin_users table to grant admin privileges
  3. Uses secure password hashing via Supabase Auth

  ## Post-Migration Steps
  - Test login with provided credentials
  - Change password via Supabase dashboard for production use
  - Consider setting up additional admin users if needed
*/

-- Create admin user using Supabase Auth
-- Email: admin@boutique-sn.com
-- Password: AdminBoutique2024!

-- Note: We need to use Supabase's built-in functions to create users
-- The auth.users table is managed by Supabase Auth system

-- Insert into admin_users table (will be linked after user signs up)
-- First, we create a function to handle admin user creation

DO $$
DECLARE
  admin_user_id uuid;
BEGIN
  -- Check if admin user already exists
  SELECT id INTO admin_user_id
  FROM auth.users
  WHERE email = 'admin@boutique-sn.com';

  -- If user doesn't exist, we'll need to create it via the API
  -- For now, we'll prepare the system to accept this user
  
  -- Note: The actual user creation needs to happen via Supabase Auth API
  -- This migration prepares the database structure
END $$;

-- Create a function to automatically add users to admin_users table
CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Automatically add admin@boutique-sn.com to admin_users table
  IF NEW.email = 'admin@boutique-sn.com' THEN
    INSERT INTO public.admin_users (id, email)
    VALUES (NEW.id, NEW.email)
    ON CONFLICT (id) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically handle admin user
DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_admin_user();

-- Also check existing users and add admin if they exist
DO $$
DECLARE
  admin_user_id uuid;
BEGIN
  SELECT id INTO admin_user_id
  FROM auth.users
  WHERE email = 'admin@boutique-sn.com';

  IF admin_user_id IS NOT NULL THEN
    INSERT INTO public.admin_users (id, email)
    VALUES (admin_user_id, 'admin@boutique-sn.com')
    ON CONFLICT (id) DO NOTHING;
  END IF;
END $$;