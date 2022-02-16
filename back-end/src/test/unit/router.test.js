const { expect } = require('chai');

const TaskRouter = require('../../app/routers/Task');

describe('Testa existencia do router', () => {
  expect(TaskRouter).exist;
});
