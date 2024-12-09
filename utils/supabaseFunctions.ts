import { supabase } from "../utils/supabase";

export const  getAllTodos = async () => {
  const todos = await supabase.from("study-record").select("*");
  return todos;
};
