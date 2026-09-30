-- Updates claim_owner_admin() to authorize both abdoulieojay@gmail.com and jassehbai100@gmail.com
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
