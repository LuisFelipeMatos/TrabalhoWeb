const { Sequelize, DataTypes } = require('sequelize');
const _Usuario = require('./usuario');
const _Nota = require('./nota');
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
let Nota = _Nota(sequelize, DataTypes);

database['Usuario'] = Usuario;
database['Nota'] = Nota;

for(const key in database) {
  if(database[key].associate) database[key].associate(database)
}

Usuario.findAll();

sequelize.authenticate().then(() => console.log(`Conectado com sucesso ao banco ${options.database}`))
  .catch((error) => console.log(`Falha ao conectar ao banco ${options.database}: ${error}`));

database.sequelize = sequelize;


module.exports = database;
