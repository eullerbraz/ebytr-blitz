import React from 'react';
import { useNavigate } from 'react-router-dom';
import useTasks from '../hooks/useTasks';

const Tasks = () => {
  const navigate = useNavigate();

  const { tasks } = useTasks();

  const handleCreate = () => {
    navigate(`/create`)
  }

  const handleEdit = (id) => {
    navigate(`/edit/${id}`)
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
              <td>{ createDate }</td>
              <td>
                <button onClick={ () => handleEdit(_id) }>Editar</button>
              </td>
            </tr>)
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
