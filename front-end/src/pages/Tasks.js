import React from 'react';
import { useNavigate } from 'react-router-dom';
import formatDate from '../helpers/formatDate';
import useTasks from '../hooks/useTasks';

const Tasks = () => {
  const navigate = useNavigate();

  const { tasks, setTasks } = useTasks();

  const handleCreate = () => {
    navigate(`/create`)
  }

  const handleEdit = (id) => {
    navigate(`/edit/${id}`)
  }

  const handleRemove = async (id) => {
    await fetch(
      `http://localhost:3001/task/${id}`,
      {
        method: 'DELETE',
      }
    );

    setTasks(tasks.filter((task) => task._id !== id))
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Tarefa</th>
          <th>Status</th>
          <th>Data de Criação</th>
        </tr>
      </thead>
      <tbody>
        {
          tasks.map(({ _id, name, status, createDate }) =>
            <tr key={ _id }>
              <td>{ name }</td>
              <td>{ status }</td>
              <td>{ formatDate(createDate) }</td>
              <td>
                <button onClick={ () => handleEdit(_id) }>Editar</button>
              </td>
              <td>
                <button onClick={ () => handleRemove(_id) }>Remover</button>
              </td>
            </tr>,
          )
        }
      </tbody>
      <tfoot>
        <tr>
          <td>
            <button onClick={ () => handleCreate() }>Adicionar</button>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

export default Tasks;
