import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    name: '',
    status: 'Pendente',
  });

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
      createDate: new Date(),
    }

    await fetch(
      'http://localhost:3001/task',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      }
    );

    navigate(`/`)
  }

  const handleBack = () => {
    navigate(`/`);
  }

  return (
    <form onSubmit={ handleSubmit }>
      <input
        type='text'
        name='name'
        placeholder='Digite um nova tarefa aqui'
        onChange={ handleChange }
      />
      <select
        name='status'
        onChange={ handleChange }
      >
        <option value="Pendente">Pendente</option>
        <option value="Em andamento">Em andamento</option>
        <option value="Pronto">Pronto</option>
      </select>
      <button type='submit'>Criar tarefa</button>
      <button type='button' onClick={ handleBack }>Voltar</button>
    </form>
  );
}

export default CreateTask;
