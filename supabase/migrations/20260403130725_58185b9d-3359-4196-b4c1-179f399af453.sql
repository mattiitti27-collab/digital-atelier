
CREATE TABLE public.atelier_access (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  stripe_session_id TEXT,
  stripe_customer_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_atelier_access_email ON public.atelier_access(email);

ALTER TABLE public.atelier_access ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can check atelier access by email"
  ON public.atelier_access
  FOR SELECT
  USING (true);

CREATE POLICY "Service role can insert atelier access"
  ON public.atelier_access
  FOR INSERT
  WITH CHECK (true);
