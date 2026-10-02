CREATE TABLE public.contact_messages (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, email text NOT NULL, message text NOT NULL, created_at timestamptz NOT NULL DEFAULT now());
GRANT INSERT ON public.contact_messages TO anon;
GRANT SELECT, INSERT, DELETE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can send a message" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (length(name) BETWEEN 2 AND 100 AND length(email) <= 255 AND length(message) BETWEEN 10 AND 1000);
CREATE POLICY "Admins can view messages" ON public.contact_messages FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete messages" ON public.contact_messages FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));