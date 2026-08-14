alter table public.payments
  add column if not exists payer_name text,
  add column if not exists payment_date date,
  add column if not exists transaction_id text,
  add column if not exists submission_id uuid;

update public.payments
set submission_id = gen_random_uuid()
where submission_id is null;

alter table public.payments
  alter column submission_id set default gen_random_uuid(),
  alter column submission_id set not null;

create unique index if not exists payments_submission_id_key
  on public.payments (submission_id);
