-- Fix contact form permissions for publishable/anon keys
grant usage on schema public to anon, authenticated;
grant insert on table public.contact_messages to anon, authenticated;

drop policy if exists "Anyone can submit contact messages" on public.contact_messages;

create policy "Anyone can submit contact messages"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (true);
