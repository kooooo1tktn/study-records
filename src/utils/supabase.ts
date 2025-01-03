import { createClient } from '@supabase/supabase-js';

// データベースとやり取りするための単一の Supabase クライアントを作成
export const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);
