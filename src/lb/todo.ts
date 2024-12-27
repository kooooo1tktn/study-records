import { Todo } from "../domain/todo";
import { supabase } from "../utils/supabase";

export async function GetAllTodos() {
  const response = await supabase.from ("study-record").select("*");

  if (response.error) {
    throw new Error(response.error.message);
  }

  const todosData = response.data.map((todo) => {
    return new Todo(todo.id, todo.title, todo.time, todo.created_at);
  });
  return todosData;
};
