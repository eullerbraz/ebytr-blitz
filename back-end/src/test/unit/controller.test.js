const sinon = require('sinon');
const { expect } = require('chai');

const TaskService = require('../../app/services/Task');
const TaskController = require('../../app/controllers/Task');
const error = require('../../app/middlewares/error');

describe('Teste camada controller de Task', () => {
  describe('Listar todas as tasks', () => {
    const response = {};
    const request = {};
    const next = (err) => error(err, request, response, next);
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
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(TaskService, 'getAll').resolves([payloadTask, payloadTask2]);
    });

    afterEach(() => {
      TaskService.getAll.restore();
    });

    describe('Quando a busca é realizada com sucesso', () => {
      it('É chamado status com o código 200', async () => {
        await TaskController.getAll(request, response, next);

        expect(response.status.calledWith(200)).to.be.true;
      });

      it('É chamado json com o produto criado', async () => {
        await TaskController.getAll(request, response, next);

        expect(response.json.calledWith([payloadTask, payloadTask2])).to.be.true;
      });
    })
  })

  describe('Insersão de uma task no banco de dados', () => {
    describe('Quando ocorre algum erro', () => {
      const response = {};
      const request = {};
      const next = (err) => error(err, request, response, next);
      const ERROR_OBJ = { code: 400, message: 'Message' };
  
      beforeEach(() => {
        request.body = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        sinon.stub(TaskService, 'create').resolves(ERROR_OBJ);
      });
  
      afterEach(() => {
        TaskService.create.restore();
      });

      it('É chamado status com o código 400', async () => {
        await TaskController.create(request, response, next);

        expect(response.status.calledWith(ERROR_OBJ.code)).to.be.true;
      });

      it('É chamado json com a mensagem de erro', async () => {
        await TaskController.create(request, response, next);

        expect(response.json.calledWith({ message: ERROR_OBJ.message })).to.be.true;
      });
    })

    describe('Quando cria a task com sucesso', () => {
      const response = {};
      const request = {};
      const next = (err) => error(err, request, response, next);
      const ID_EXAMPLE = '614cb554411d68f491ba5782';
      const payloadTask = {
        name: 'Task',
        status: 'Pendente',
        createDate: '2022-02-15',
        _id: ID_EXAMPLE,
      }
  
      beforeEach(() => {
        response.body = payloadTask;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        sinon.stub(TaskService, 'create').resolves({ task: payloadTask });
      });
  
      afterEach(() => {
        TaskService.create.restore();
      });


      it('É chamado status com o código 201', async () => {
        await TaskController.create(request, response, next);

        expect(response.status.calledWith(201)).to.be.true;
      });

      it('É chamado json com a task criada', async () => {
        await TaskController.create(request, response, next);

        expect(response.json.calledWith(payloadTask)).to.be.true;
      });
    })

  })

  describe('Atualização de uma task no banco de dados', () => {
    describe('Quando ocorre algum erro', () => {
      const response = {};
      const request = {};
      const next = (err) => error(err, request, response, next);
      const ERROR_OBJ = { code: 400, message: 'Message' };
  
      beforeEach(() => {
        request.body = {};
        request.params = { id: '' };
        
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        sinon.stub(TaskService, 'update').resolves(ERROR_OBJ);
      });
  
      afterEach(() => {
        TaskService.update.restore();
      });

      it('É chamado status com o código 400', async () => {
        await TaskController.update(request, response, next);

        expect(response.status.calledWith(ERROR_OBJ.code)).to.be.true;
      });

      it('É chamado json com a mensagem de erro', async () => {
        await TaskController.update(request, response, next);

        expect(response.json.calledWith({ message: ERROR_OBJ.message })).to.be.true;
      });
    })

    describe('Quando a task é atualizada com sucesso', () => {
      const response = {};
      const request = {};
      const next = (err) => error(err, request, response, next);
      const ID_EXAMPLE = '614cb554411d68f491ba5782';
      const payloadTask = {
        name: 'Task',
        status: 'Pendente',
        createDate: '2022-02-15',
        _id: ID_EXAMPLE,
      }
  
      beforeEach(() => {
        request.params = { id: ID_EXAMPLE };
        request.body = payloadTask;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        sinon.stub(TaskService, 'update').resolves({ task: payloadTask });
      });
  
      afterEach(() => {
        TaskService.update.restore();
      });


      it('É chamado status com o código 200', async () => {
        await TaskController.update(request, response, next);

        expect(response.status.calledWith(200)).to.be.true;
      });

      it('É chamado json com a task criada', async () => {
        await TaskController.update(request, response, next);

        expect(response.json.calledWith(payloadTask)).to.be.true;
      });
    })

  })

  describe('Deletar uma task no banco de dados', () => {
    describe('Quando ocorre algum erro', () => {
      const response = {};
      const request = {};
      const next = (err) => error(err, request, response, next);
      const ERROR_OBJ = { code: 400, message: 'Message' };
  
      beforeEach(() => {
        request.params = { id: '' };
        
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        sinon.stub(TaskService, 'remove').resolves(ERROR_OBJ);
      });
  
      afterEach(() => {
        TaskService.remove.restore();
      });

      it('É chamado status com o código 400', async () => {
        await TaskController.remove(request, response, next);

        expect(response.status.calledWith(ERROR_OBJ.code)).to.be.true;
      });

      it('É chamado json com a mensagem de erro', async () => {
        await TaskController.remove(request, response, next);

        expect(response.json.calledWith({ message: ERROR_OBJ.message })).to.be.true;
      });
    })

    describe('Quando a task é deletada com sucesso', () => {
      const response = {};
      const request = {};
      const next = (err) => error(err, request, response, next);
      const ID_EXAMPLE = '614cb554411d68f491ba5782';
      const payloadTask = {
        name: 'Task',
        status: 'Pendente',
        createDate: '2022-02-15',
        _id: ID_EXAMPLE,
      }
  
      beforeEach(() => {
        request.params = { id: ID_EXAMPLE };
        request.body = payloadTask;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        sinon.stub(TaskService, 'remove').resolves({ task: payloadTask });
      });
  
      afterEach(() => {
        TaskService.remove.restore();
      });


      it('É chamado status com o código 200', async () => {
        await TaskController.remove(request, response, next);

        expect(response.status.calledWith(200)).to.be.true;
      });

      it('É chamado json com a task criada', async () => {
        await TaskController.remove(request, response, next);

        expect(response.json.calledWith(payloadTask)).to.be.true;
      });
    })

  })
});