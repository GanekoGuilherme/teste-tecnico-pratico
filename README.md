<h3 align="center">
    Teste Técnico Prático
</h3>

<p align="center">Web API</p>


<p align="center">
  <a href="#%EF%B8%8F-sobre-o-projeto">Sobre o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-inicializando">Inicializando</a>&nbsp;&nbsp;&nbsp;
</p>


## 💇🏻‍♂️ Sobre o projeto

Este projeto tem o objetivo de criar uma aplicação Back-End acompanhado pelo framework Express.

Neste sistema o usuário pode:
- Cadastrar ou atualizar um automóvel (com os atributos placa [AAA1234 ou AAA1A23], cor e marca).
- Deletar e recuperar um automóvel (através do identificador).
- Visualizar um ou mais automóveis.
- Listar automóveis deletados.

- Cadastrar ou atualizar um motorista (com o atributo nome).
- Deletar e recuperar um motorista (através do identificador).
- Visualizar um ou mais motoristas.
- Listar motoristas deletados.

- Registrar um aluguel de automóvel (vinculando um motorista e automóvel por vez).
- Encerrar o aluguel do automóvel (registrando a data e hora da devolução).
- Listar todos os aluguéis.

## 💻 Inicializando

### Requisitos

- [Node.js](https://nodejs.org/en/) = 16.14.2
- [MongoDB](https://www.mongodb.com/pt-br) = 5.0.9

**Clone o projeto e acesse a pasta**

```bash
$ git clone https://github.com/GanekoGuilherme/teste-tecnico-pratico.git
```

**Siga os próximos passos**

```bash
# Instalando as dependências
$ npm install

# Crie uma cópia do ".env.example" para ".env"
# e insira SUAS variáveis de ambiente
$ cp .env.example .env

# Executando no ambiente local
$ npm run dev

# Executando os testes unitários da aplicação.
$ npm run test
```

---

Criado por Guilherme Massaru Ganeko 👋 [See my linkedin](https://www.linkedin.com/in/guilhermeganeko/)
