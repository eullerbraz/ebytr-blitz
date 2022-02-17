const sinon = require('sinon');
const { expect } = require('chai');

const TaskModel = require('../../app/models/Task');
const TaskService = require('../../app/services/Task');

describe('Teste camada service de Task', () => {
  describe('Listar todas as tasks', () => {
    const ID_EXAMPLE = '614cb554411d68f491ba5782';
    const ID_EXAMPLE2 = '614cb554411d68f491ba5783';
    const payloadTask = {
      name: 'Task',
      status: 'Pendente',
      createDate: '2022-02-15',
      _id: ID_EXAMPLE,
    }

    const payloadTask2 = {
      name: 'Task2',
      status: 'Pronto',
      createDate: '2022-02-17',
      _id: ID_EXAMPLE2,
    }

    beforeEach(() => {
      sinon.stub(TaskModel, 'find').resolves([payloadTask, payloadTask2]);
      
    });

    afterEach(() => {
      TaskModel.find.restore();
    });

    describe('Quando a busca é realizada com sucesso', () => {
      it('Retorna um array', async () => {
        const response = await TaskService.getAll();
        expect(response).to.be.an('array');
      })

      it('O array possui os produtos que estão no banco de dados', async () => {
        const response = await TaskService.getAll();
        expect(response[1]._id).to.be.equal(payloadTask2._id);
      })
    })
  })

  describe('Insersão de uma task no banco de dados', () => {
    const payloadTask = {
      name: 'Task',
      status: 'Pendente',
      createDate: '2022-02-15'
    }

    beforeEach(() => {
      const ID_EXAMPLE = '614cb554411d68f491ba5782';

      sinon.stub(TaskModel, 'create').resolves({ ...payloadTask, _id: ID_EXAMPLE });
      
    });

    afterEach(() => {
      TaskModel.create.restore();
    });

    describe('Quando o status informado é inválido', () => {
      const invalidTask = {
        name: 'Task',
        status: 'Pendenta',
        createDate: '2022-02-15'
      }

      it('Retorna um objeto', async () => {
        const response = await TaskService.create(invalidTask);
        expect(response).to.be.a('object');
      })

      it('A chave message do objeto possui a mensagem "status" must be one of [Pendente, Em andamento, Pronto]', async () => {
        const response = await TaskService.create(invalidTask);
        expect(response.message).to.be.equal('"status" must be one of [Pendente, Em andamento, Pronto]');
      })
    })

    describe('Quando a data informado é inválida', () => {
      const invalidTask = {
        name: 'Task',
        status: 'Pendente',
        createDate: '2022-02-15a'
      }

      it('Retorna um objeto', async () => {
        const response = await TaskService.create(invalidTask);
        expect(response).to.be.a('object');
      })

      it('A chave message do objeto possui a mensagem "createDate" must be a valid date', async () => {
        const response = await TaskService.create(invalidTask);
        expect(response.message).to.be.equal('"createDate" must be a valid date');
      })
    })

    describe('Quando o payload é válido', () => {
      it('Retorna um objeto', async () => {
        const response = await TaskService.create(payloadTask);
        expect(response).to.be.a('object');
      })

      it('O objeto possui uma chave task', async () => {
        const response = await TaskService.create(payloadTask);
        expect(response).to.have.a.key('task');
      })
    })
  })

  describe('Atualização de uma task no banco de dados', () => {
    const ID_EXAMPLE = '614cb554411d68f491ba5782';

    describe('Quando o status informado é inválido', () => {
      const invalidTask = {
        name: 'Task',
        status: 'Pendenta',
        createDate: '2022-02-15'
      }

      it('Retorna um objeto', async () => {
        const response = await TaskService.update(ID_EXAMPLE, invalidTask);
        expect(response).to.be.a('object');
      })

      it('A chave message do objeto possui a mensagem "status" must be one of [Pendente, Em andamento, Pronto]', async () => {
        const response = await TaskService.update(ID_EXAMPLE, invalidTask);
        expect(response.message).to.be.equal('"status" must be one of [Pendente, Em andamento, Pronto]');
      })
    })

    describe('Quando a data informado é inválida', () => {
      const invalidTask = {
        name: 'Task',
        status: 'Pendente',
        createDate: '2022-02-15a'
      }

      it('Retorna um objeto', async () => {
        const response = await TaskService.update(ID_EXAMPLE, invalidTask);
        expect(response).to.be.a('object');
      })

      it('A chave message do objeto possui a mensagem "createDate" must be a valid date', async () => {
        const response = await TaskService.update(ID_EXAMPLE, invalidTask);
        expect(response.message).to.be.equal('"createDate" must be a valid date');
      })
    })

    describe('Quando o id informado não existe', () => {
      const payloadTask = {
        name: 'Task',
        status: 'Pronto',
        createDate: '2022-02-15'
      }
    
      beforeEach(() => {
        sinon.stub(TaskModel, 'findByIdAndUpdate').resolves(null);
        
      });
  
      afterEach(() => {
        TaskModel.findByIdAndUpdate.restore();
      });

      it('Retorna um objeto', async () => {
        const response = await TaskService.update('1', payloadTask);
        expect(response).to.be.a('object');
      })

      it('A chave message do objeto possui a mensagem Invalid id', async () => {
        const response = await TaskService.update('1', payloadTask);
        expect(response.message).to.be.equal('Invalid id');
      })
    })

    describe('Quando o payload é válido', () => {
      const payloadTask = {
        name: 'Task',
        status: 'Pronto',
        createDate: '2022-02-15'
      }
    
      beforeEach(() => {
        sinon.stub(TaskModel, 'findByIdAndUpdate').resolves({ ...payloadTask, _id: ID_EXAMPLE });
        
      });
  
      afterEach(() => {
        TaskModel.findByIdAndUpdate.restore();
      });

      it('Retorna um objeto', async () => {
        const response = await TaskService.update(ID_EXAMPLE, payloadTask);
        expect(response).to.be.a('object');
      })

      it('O objeto possui uma chave task', async () => {
        const response = await TaskService.update(ID_EXAMPLE, payloadTask);
        expect(response).to.have.a.key('task');
      })
    })
  })

  describe('Deletar uma task no banco de dados', () => {
    const ID_EXAMPLE = '614cb554411d68f491ba5782';

    describe('Quando o id informado não existe', () => {    
      beforeEach(() => {
        sinon.stub(TaskModel, 'findByIdAndDelete').resolves(null);
        
      });
  
      afterEach(() => {
        TaskModel.findByIdAndDelete.restore();
      });

      it('Retorna um objeto', async () => {
        const response = await TaskService.remove('1');
        expect(response).to.be.a('object');
      })

      it('A chave message do objeto possui a mensagem Invalid id', async () => {
        const response = await TaskService.remove('1');
        expect(response.message).to.be.equal('Invalid id');
      })
    })

    describe('Quando o payload é válido', () => {
      const payloadTask = {
        name: 'Task',
        status: 'Pronto',
        createDate: '2022-02-15'
      }
    
      beforeEach(() => {
        sinon.stub(TaskModel, 'findByIdAndDelete').resolves({ ...payloadTask, _id: ID_EXAMPLE });
      });
  
      afterEach(() => {
        TaskModel.findByIdAndDelete.restore();
      });

      it('Retorna um objeto', async () => {
        const response = await TaskService.remove(ID_EXAMPLE);
        expect(response).to.be.a('object');
      })

      it('O objeto possui uma chave task', async () => {
        const response = await TaskService.remove(ID_EXAMPLE);
        expect(response).to.have.a.key('task');
      })
    })
  })
});