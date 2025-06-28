import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({path:require('path').resolve(__dirname,'../../.env')})

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseServiceKey);


