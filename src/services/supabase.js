import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pjecndtvitjsarzherdj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqZWNuZHR2aXRqc2FyemhlcmRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcwODI3NTYsImV4cCI6MjAxMjY1ODc1Nn0.K9fUnt_XlGTtkTFNApq4Z9P1WYpaLff4Zo2MW5gMeko";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
