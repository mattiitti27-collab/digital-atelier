
-- Create a secure function to check atelier access by email (returns only boolean, not row data)
CREATE OR REPLACE FUNCTION public.check_atelier_access(_email text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.atelier_access
    WHERE email = _email
  )
$$;

-- Drop the overly permissive public SELECT policy
DROP POLICY IF EXISTS "Anyone can check atelier access by email" ON public.atelier_access;

-- Add a restrictive policy: only service role (edge functions) can read
CREATE POLICY "Only service role can read atelier_access"
  ON public.atelier_access
  FOR SELECT
  USING (false);
