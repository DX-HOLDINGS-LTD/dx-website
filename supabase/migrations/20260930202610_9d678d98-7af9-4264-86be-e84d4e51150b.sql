CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- Grants admin to authorized DX administrator accounts (verified email match)
CREATE OR REPLACE FUNCTION public.claim_owner_admin()
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE _email text;
BEGIN
  IF auth.uid() IS NULL THEN RETURN false; END IF;
  SELECT lower(email) INTO _email FROM auth.users WHERE id = auth.uid() AND email_confirmed_at IS NOT NULL;
  IF _email IN ('abdoulieojay@gmail.com', 'jassehbai100@gmail.com') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (auth.uid(), 'admin') ON CONFLICT DO NOTHING;
  END IF;
  RETURN public.has_role(auth.uid(), 'admin');
END;
$$;
REVOKE EXECUTE ON FUNCTION public.claim_owner_admin() FROM public, anon;
GRANT EXECUTE ON FUNCTION public.claim_owner_admin() TO authenticated;

CREATE TABLE public.waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  region text,
  use_case text,
  updates_opt_in boolean NOT NULL DEFAULT true,
  source text NOT NULL DEFAULT 'website',
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX waitlist_email_unique ON public.waitlist (lower(email));
GRANT INSERT ON public.waitlist TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.waitlist TO authenticated;
GRANT ALL ON public.waitlist TO service_role;
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can join the waitlist" ON public.waitlist FOR INSERT TO anon, authenticated
  WITH CHECK (source = 'website' AND length(full_name) BETWEEN 2 AND 100 AND length(email) <= 255 AND length(phone) <= 30);
CREATE POLICY "Admins can view waitlist" ON public.waitlist FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can add waitlist rows" ON public.waitlist FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update waitlist" ON public.waitlist FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete waitlist" ON public.waitlist FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.waitlist_count()
RETURNS integer LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$ SELECT count(*)::int FROM public.waitlist $$;
GRANT EXECUTE ON FUNCTION public.waitlist_count() TO anon, authenticated;