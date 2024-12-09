import { useEffect, useState } from 'react'

import './App.css'
import { getAllTodos } from '../utils/supabaseFunctions';

export const Todo = () => {
  const [records, setRecords] = useState([]);

  const [title, setTitle] = useState("");
  const [time, setTime] = useState(0);

  const [error, setError] = useState("");

  const onClickAdd = () => {
    if (title === "" || time === "") {
      setError("入力されていない項目があります");
      return;
    }

    const newRecords = { title: title, time: Number(time) };
    setRecords([...records, newRecords]);
    setTitle("");
    setTime("");
    setError("");
  };

  const getTotalTimes = () => {
    return records.reduce((total, record) => total + record.time,0);
  };

  const [ todos, setTodos ] = useState<any>([]);

  useEffect(() => {
    const getTodos = async () =>{
      const todos = await getAllTodos();
      setTodos(todos);
      console.log(todos);
    };
    getTodos();
  }, []);

  return (
    <>
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
          {records.map((record) => {
            return (
              <li key={record.title}>
                {record.title}
                {record.time}時間
              </li>
            );
          })}
        </ul>
      </div>

      <button onClick={onClickAdd}>登録</button>
      {error && <p>{error}</p>}
      <p>合計時間 : {getTotalTimes()} / 1000（h）</p>
    </>
  );
};

export default Todo
