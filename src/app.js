const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const session = require("express-session");
const passport = require('passport');
const bcrypt = require("bcrypt")
//const session = require('cookie-session');
//var RedisStore = require('connect-redis')(express);
const MemoryStore = require('memorystore')(session)



const { User } = require('./db')
const { SECRET } = process.env


const server = express();

server.name = 'API';

const urlFlamaFront = process.env.BASE_URL || 'http://localhost:3000';

server.set('trust proxy', 1);
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser(SECRET));
server.use(morgan('dev'));

server.use(
  session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
          checkPeriod: 86400000 // prune expired entries every 24h
    }),
    secret: SECRET || 'secret',
    resave: false,
    saveUninitialized: true,
  })
); 



//For Passport

server.use(passport.initialize());
server.use(passport.session());

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', `${urlFlamaFront}`); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
  
  next();
});

//Auntenticacion -- Passport

const LocalStrategy  = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(function (username, password, done) {
    console.log('hola carola')
    User.findOne({where:{username: username}})
      .then((user) => {
        if(!user){
          console.log('No se encontro el user')
          return done(null,false)
        }
        if(user){
          bcrypt.compare(password, user.password)
          .then((res) => {
            if(!res){
              console.log('Se encontro el user, pero fallo la password')
              return done(null, false)
            }
            if(res){
              console.log('Se encontro el user y la password')
              return done(null, user)
            }
          })
        }
      })
      .catch( err => {
        console.log(err)
        return done(err)
      })


  })
)

passport.serializeUser(function(user, done) {
  console.log('paso dos de la autenticación')
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {  
  console.log('paso tres de la autenticación')
  
  await User.findByPk(id, (err, user) => {
    done(null, user);
  })
  .then((user) => {
      console.log('va bien')
      done(null, user);
    })    
  .catch(err => {
      return done(err);
    })
});





server.use('/', routes);






// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  
  res.status(status).send(message);
});

module.exports = server;
