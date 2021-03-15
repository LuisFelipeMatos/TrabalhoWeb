const { Sequelize, DataTypes } = require('sequelize');
const _Usuario = require('./usuario');
const database = {};

const options = {
  username: 'postgres',
  password: 'luis',
  database: 'notas',
  host: 'localhost',
  dialect: 'postgres',
};

const sequelize = new Sequelize(options);

let Usuario = _Usuario(sequelize, DataTypes);

Usuario.findAll();

sequelize.authenticate().then(() => console.log(`Conectado com sucesso ao banco ${options.database}`))
  .catch((error) => console.log(`Falha ao conectar ao banco ${options.database}: ${error}`));

database.sequelize = sequelize;


module.exports = database;
