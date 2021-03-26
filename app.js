const express = require('express');
const usuario = require('./routes/usuario');
const nota = require('./routes/nota');
const checks = require('./routes/checklist');
const tags = require('./routes/tag')
const bodyParser = require('body-parser');
const app = express();
const login = require('./routes/login');
const fs = require('fs');
const https = require('https');
const portaHttps = 4443;
const cors = require('cors');
const morgan = require('morgan');
const auth = require('./middlewares/auth');

app.use(
    cors({
      origin: ['http://localhost:8080'],
    })
  );


app.use('/login',login);
app.use(auth);
app.use('/checklist', checks);
app.use('/tag', tags);
app.use('/usuario', usuario);
app.use('/nota', nota);

app.use(bodyParser.json());
app.use(morgan('dev'));

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