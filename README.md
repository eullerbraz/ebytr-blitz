# Projeto Ebytr

## Comentários do projeto

Projeto realizado para resolver problema de produtividade dos colaboradores da empresa Ebytr. O backend foi realizado com NodeJs e ExpressJs, utilizando o banco NoSQL MongoDB com o ORM mongoose. Já o frontend foi realizado com ReactJs e CSS para estilização.
Os testes no backend foram realizados com Mocha, Chai, Sinon e nyc para cobertura.

---

## Instalação do projeto

Para ter acesso ao projeto você pode seguir o passo abaixo.

1. Clone o repositório
  * `git@github.com:eullerbraz/ebytr-blitz.git`.
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd ebytr-blitz`

2. Instale as dependências
  * `npm install`

3. Inicialize o backend:
    * `cd back-end`
    * `npm start`

4. Inicialize o frontend em outro terminal:
    * `cd front-end`
    * `npm start`

---

## Testes

Para rodar os testes unitários e de integração do backend você deve:

1. Entrar na pasta do backend e rodar o comando:
    * `cd back-end`
    * `npm test`

2. Também é possível testar a cobertura de testes:
    * `npm run coverage`
