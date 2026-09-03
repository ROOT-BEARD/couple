CREATE OR REPLACE FUNCTION generate_pair_code()
RETURNS numeric AS $$
DECLARE
  rand_num numeric;
  already_exits boolean;
BEGIN
  LOOP
    rand_num := FLOOR(random() * 900000 + 100000)::numeric;

    SELECT EXISTS (
      SELECT 1
      FROM users
      WHERE pair_code = rand_num
    ) INTO already_exits;

    EXIT WHEN NOT already_exits;
  END LOOP;
  return rand_num;

END;
$$ language plpgsql;

SELECT generate_pair_code();