const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');

const { expect } = chai;
const server = require('../../app');
const getConnection = require('./mocks/connectionMock');

const TASK_URI = '/task';
const ID_EXAMPLE = '614cb554411d68f491ba5782';
const ID_EXAMPLE2 = '614cb554411d68f491ba5783';
const payloadTask = {
  name: 'Task',
  status: 'Pendente',
  createDate: '2022-02-15',
}

chai.use(chaiHttp);

describe('PUT /task/:id', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('Quando a task é inválida', () => {
    let response;
    
    before(async () => {
      response = await chai.request(server)
        .put(`${TASK_URI}/${ID_EXAMPLE}`)
        .send({ ...payloadTask, status: 'a' });
    });

    it('Retorna um código de status "400"', () => {
      expect(response).to.have.status(400);
    });

    it('Retorna um objeto', () => {
      expect(response).to.have.be.an('object');
    });

    it('Retorna o objeto possui o atributo message com a mensagem "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('"status" must be one of [Pendente, Em andamento, Pronto]');
    });
  });

  describe('Quando o id da task é inválido', () => {
    let response;

    before(async () => {
      await connectionMock.db('ebytr')
      .collection('tasks')
      .insertOne({ ...payloadTask });

      response = await chai.request(server)
        .put(`${TASK_URI}/${ID_EXAMPLE}`)
        .send({ ...payloadTask });
    });

    after(async () => {
      await connectionMock.db('ebytr')
      .collection('tasks')
      .deleteMany({});
    });

    it('Retorna um código de status "400"', () => {
      expect(response).to.have.status(400);
    });

    it('Retorna um objeto', () => {
      expect(response).to.have.be.an('object');
    });

    it('Retorna o objeto possui o atributo message com a mensagem Invalid id', () => {
      expect(response.body.message).to.be.equal('Invalid id');
    });
  });

  describe('Quando a task é editada com sucesso', () => {
    let response;

    before(async () => {
      await connectionMock.db('ebytr')
      .collection('tasks')
      .insertOne({ ...payloadTask, _id: ID_EXAMPLE });

      response = await chai.request(server)
        .put(`${TASK_URI}/${ID_EXAMPLE}`)
        .send({ ...payloadTask });
    });

    after(async () => {
      await connectionMock.db('ebytr')
      .collection('tasks')
      .deleteMany({});
    });

    it('Retorna um código de status "200"', () => {
      expect(response).to.have.status(200);
    });

    it('Retorna um objeto no body', () => {
      expect(response.body).to.have.be.an('object');
    });

    it('O objeto ser igual ao objeto passado', () => {
    expect(response.body).to.have.all.keys('_id', 'name', 'status', 'createDate')    });
  });
});
