import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import useTasks from '../hooks/useTasks';

const UpdateTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { tasks } = useTasks();

  const [foundTask, setFoundTask] = useState({
    _id: '',
    name: '',
    status: 'Pendente',
    createDate: '',
  });

  const [state, setState] = useState({
    name: '',
    status: 'Pendente',
  });

  useEffect(() => {
    if (tasks.length) {
      setFoundTask(tasks.find((task) => task._id === id));
    }
  }, [tasks]);

  useEffect(() => {
    setState({
      name: foundTask.name,
      status: foundTask.status,
    });
  }, [foundTask]);

  const handleChange = ({ target: { name, value } }) => {
    setState({
      ...state,
      [name]: value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, status } = state;

    const task = {
      name,
      status,
    }

    await fetch(
      `http://localhost:3001/task/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      }
    );

    navigate(`/`)
  }

  return (
    <form onSubmit={ handleSubmit }>
      <input
        type='text'
        name='name'
        placeholder='Digite um nova tarefa aqui'
        value={ state.name }
        onChange={ handleChange }
      />
      <select
        name='status'
        value={ state.status }
        onChange={ handleChange }
      >
        <option value="Pendente">Pendente</option>
        <option value="Em andamento">Em andamento</option>
        <option value="Pronto">Pronto</option>
      </select>
      <button type='submit'>Atualizar tarefa</button>
    </form>
  );
}

export default UpdateTask;
