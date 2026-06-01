alter table public.reviews
add column if not exists reviewer_gender text not null default 'male';

alter table public.reviews
drop constraint if exists reviews_reviewer_gender_check;

alter table public.reviews
add constraint reviews_reviewer_gender_check
check (reviewer_gender in ('male', 'female'));

update public.reviews
set reviewer_gender = 'male'
where reviewer_gender is null;