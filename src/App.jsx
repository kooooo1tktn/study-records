import { useEffect, useState } from 'react';
import { GetAllTodos } from './lb/todo';
import { supabase } from './utils/supabase';
// import { Todo } from './domain/todo';

// import './App.css';

export const TodoComponent = () => {
  const [records, setRecords] = useState([]);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState(0);
  const [error, setError] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const onClickAdd = async () => {
    if (title === "" || time === "") {
      setError("入力されていない項目があります");
      return;
    }

    const newRecords = { title: title, time: Number(time) };

    const { error } = await supabase
      .from("study-record")
      .insert([newRecords]);

    if (error) {
      console.error("Error inserting data:", error);
      setError("データの追加に失敗しました");
      return;
    }

      const todosData = await GetAllTodos();
      setTodos(todosData);

      setRecords([...records, newRecords]);
      setTitle("");
      setTime(0);
      setError("");
  };

  const onClickDelete = async (id) => {
    const { error } = await supabase
    .from("study-record")
    .delete()
    .eq("id", id);

    if (error) {
      console.error("Error deleting data:", error);
      setError("データの削除に失敗しました");
      return;
    }

    setTodos(todos.filter(todo => todo.id !== id));
  };

  const getTotalTimes = () => {
    const todosTotal = todos.reduce((total, todo) => total + todo.time, 0);
    return todosTotal;
  };

  useEffect(() => {
    const getAllTodos = async () => {
      const todosData = await GetAllTodos();
      setTodos(todosData);
      setLoading(false);
  };

    getAllTodos();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <title data-testid="title">Hello Jest</title>
      <h1>学習記録一覧</h1>
      <label>
        学習内容
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </label>
      <br />
      <label>
        学習時間
        <input
          value={time}
          onChange={e => setTime(e.target.value)}
          type="number"
        />時間
      </label>

      <div>
        {<p>入力されている学習内容：{title}</p>}
        {<p>入力されている時間：{time}時間</p>}
      </div>

      <div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.title}
              {todo.time}時間
              {todo.createdAt}
              <button onClick={() => onClickDelete(todo.id)}>削除</button>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={onClickAdd}>登録</button>
      {error && <p>{error}</p>}
      <p>合計時間 : {getTotalTimes()} / 1000（h）</p>
    </>
  );
}

export default TodoComponent;
