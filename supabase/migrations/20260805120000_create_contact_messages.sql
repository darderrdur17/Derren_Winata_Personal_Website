-- Contact form submissions from portfolio visitors
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) > 0 and char_length(name) <= 100),
  email text not null check (char_length(trim(email)) > 0 and char_length(email) <= 255),
  subject text not null check (char_length(trim(subject)) > 0 and char_length(subject) <= 200),
  message text not null check (char_length(trim(message)) >= 10 and char_length(message) <= 2000),
  created_at timestamptz not null default now()
);

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);

alter table public.contact_messages enable row level security;

-- Allow anonymous visitors to submit the contact form
create policy "Anyone can submit contact messages"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (true);

-- Only service role / dashboard can read submissions (no public select policy)
