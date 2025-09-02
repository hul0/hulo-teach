create or replace function public.hulo_increment_points(p_user_id uuid, p_delta int4)
returns int4
language plpgsql
as $$
declare new_points int4;
begin
  update public.users
  set points = points + p_delta
  where id = p_user_id
  returning points into new_points;
  return new_points;
end;
$$;
