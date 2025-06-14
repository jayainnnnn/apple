// core modules
const path = require('path');

// external depandencies
const express = require('express');

// local modules
// login signup
const homeRouter = require('./routes/homeRouter.js');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));


app.use(express.urlencoded())
app.use(homeRouter);




const PORT = 3008;
app.listen(PORT, () => {
    console.log(`Server Running at http://localhost:${PORT}`);
});