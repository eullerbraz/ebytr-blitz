import { useEffect, useState } from 'react';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('http://localhost:3001/task');
      const result = await response.json();
      setTasks(result);
    }

    fetchTasks();
  }, []);

  return {
    tasks,
    setTasks,
  }
}

export default useTasks;
