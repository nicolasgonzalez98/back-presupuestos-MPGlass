require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}`, {
  logging: false, // set to console.log to see the raw SQL queries
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: process.env.DB_PORT?true:false,
    native:true
  }
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { User, Client, Budget, Article, BudgetArticle } = sequelize.models;

// Aca vendrian las relaciones
//------------------USER O:M BUDGET----------------------
User.hasMany(Budget)
Budget.belongsTo(User)

//------------------USER O:M ARTICLE----------------------
User.hasMany(Article)
Article.belongsTo(User)

//------------------USER O:M CLIENT----------------------
User.hasMany(Client)
Client.belongsTo(User)

//------------------CLIENT O:M BUDGET----------------------
Client.hasMany(Budget)
Budget.belongsTo(Client)

//------------------ARTICLE N:M BUDGET----------------------
Budget.belongsToMany(Article, { 
  as: 'list_budget',
  foreignKey: 'budget_id',
  through: BudgetArticle
});

Article.belongsToMany(Budget, { 
  as: 'list_budget',
  foreignKey: 'article_id',
  through: BudgetArticle
});


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
