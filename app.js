// core modules
const path = require('path');
const rootdir = require('./utils/pathutil');
// external depandencies
const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const {Pool} = require('pg');

const pgPool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'apple',
  password: 'jay',
  port: 5432,
});

const app = express();

app.use(session({
  store: new pgSession({
    pool: pgPool,                
    tableName: 'user_sessions',
    createTableIfMissing: true 
  }),
  secret: 'your_secret_key',    
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000 // 60 min
  }
}));
// local modules
// login signup
const homeRouter = require('./routes/homeRouter.js');
const laptopRouter = require('./routes/laptopRouter.js');



app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));


app.use(express.urlencoded());

app.use(homeRouter);
app.use("/laptophome",laptopRouter);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootdir,'views','404.html'))
});



const PORT = 3008;
app.listen(PORT, () => {
    console.log(`Server Running at http://localhost:${PORT}`);
});