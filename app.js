const express = require('express');
const usuario = require('./routes/usuario');
const nota = require('./routes/nota');
const checks = require('./routes/checklist');
const tags = require('./routes/tag')
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const fs = require('fs');
const https = require('https');
const portaHttps = 443;



app.use('/checklist', checks);
app.use('/tag', tags);
app.use('/usuario', usuario);
app.use('/nota', nota);
app.use(bodyParser.json());

const key = fs.readFileSync('certs/localhost-key.pem');
const cert = fs.readFileSync('certs/localhost.pem');

const credentials = { key, cert};
const httpsServer = https.createServer(credentials, app);


httpsServer.listen(potaHttps, () => {
    console.log(`API rondando seguramente na porta ${portaHttps}`);
});



app.listen(port, () => {
    console.log(`Aplicação rodando em http://localhost:${port}`);
});