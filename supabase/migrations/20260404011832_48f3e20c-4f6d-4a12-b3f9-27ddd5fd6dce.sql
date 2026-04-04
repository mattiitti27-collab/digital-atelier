
-- 1. ATELIER_ACCESS: Block all writes from non-service-role users
-- RLS is already enabled; SELECT is already blocked with USING(false)
-- Add explicit deny policies for INSERT, UPDATE, DELETE
CREATE POLICY "Block all inserts on atelier_access"
  ON public.atelier_access
  FOR INSERT
  WITH CHECK (false);

CREATE POLICY "Block all updates on atelier_access"
  ON public.atelier_access
  FOR UPDATE
  USING (false);

CREATE POLICY "Block all deletes on atelier_access"
  ON public.atelier_access
  FOR DELETE
  USING (false);

-- 2. USER_ROLES: Fix privilege escalation
-- Drop the overly broad ALL policy and replace with specific admin-only policies
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;

CREATE POLICY "Admins can insert roles"
  ON public.user_roles
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update roles"
  ON public.user_roles
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete roles"
  ON public.user_roles
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 3. CONTACT_SUBMISSIONS: Add validation trigger for length and email format
CREATE OR REPLACE FUNCTION public.validate_contact_submission()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF length(NEW.name) > 100 THEN
    RAISE EXCEPTION 'Name must be 100 characters or less';
  END IF;
  IF length(NEW.email) > 254 THEN
    RAISE EXCEPTION 'Email must be 254 characters or less';
  END IF;
  IF length(NEW.message) > 5000 THEN
    RAISE EXCEPTION 'Message must be 5000 characters or less';
  END IF;
  IF NEW.email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_contact_submission_trigger
  BEFORE INSERT ON public.contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_contact_submission();
