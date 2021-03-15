const express = require('express');
const usuario = require('./routes/usuario');
const nota = require('./routes/nota');
const checks = require('./routes/checklist');
const tags = require('./routes/tag')
const bodyParser = require('body-parser');
const app = express();
const port = 3000;



app.use('/checklist', checks);
app.use('/tag', tags);
app.use('/usuario', usuario);
app.use('/nota', nota);
app.use(bodyParser.json());





app.listen(port, () => {
    console.log(`Aplicação rodando em http://localhost:${port}`);
});