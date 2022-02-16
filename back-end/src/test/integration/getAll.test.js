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
  _id: ID_EXAMPLE,
}

const payloadTask2 = {
  name: 'Task2',
  status: 'Pronto',
  createDate: '2022-02-17',
  _id: ID_EXAMPLE2,
}

chai.use(chaiHttp);

describe('GET /task', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('Quando a listagem é feita com sucesso', () => {
    let response;

    before(async () => {
      await connectionMock.db('ebytr')
      .collection('tasks')
      .insertMany([payloadTask, payloadTask2]);

      response = await chai.request(server)
        .get(TASK_URI);
    });

    after(async () => {
      await connectionMock.db('ebytr')
      .collection('tasks')
      .deleteMany({});
    });

    it('Retorna um código de status "200"', () => {
      expect(response).to.have.status(200);
    });

    it('Retorna um array no body', () => {
      expect(response.body).to.have.be.an('array');
    });

    it('O array deve conter as receitas no BD', () => {
      expect(response.body).to.be.deep.equal([payloadTask, payloadTask2]);
    });
  });
});
