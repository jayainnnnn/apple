// core modules
const path = require('path');

// external depandencies
const express = require('express');

// local modules
// login signup
const homeRouter = require('./routes/homeRouter.js');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));


app.use(express.urlencoded())
app.use(homeRouter);




const PORT = 3008;
app.listen(PORT, () => {
    console.log(`Server Running at http://localhost:${PORT}`);
});