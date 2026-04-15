import { createClient } from '@supabase/supabase-js';

export function createTiendaEnBioClient(supabaseUrl: string, supabaseAnonKey: string) {
  return createClient(supabaseUrl, supabaseAnonKey);
}

export type TiendaEnBioClient = ReturnType<typeof createTiendaEnBioClient>;
