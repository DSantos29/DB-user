import express from 'express';
import cors from 'cors'
import UsauarioController from './src/controllers/usuarioController.js';

// Importando o express

const app = express();
const port = 3000

//O middleware "express.json()" irá converter esse JSON em um objeto JavaScript que pode ser manipulado pelo servidor. 
app.use(express.json());
app.use(cors())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "usuariodb.onrender.com/"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


UsauarioController.getUsauarioController(app)


//Servidor rodando na porta 3000
app.listen(`${port}`, () =>
console.log(`Servidor iniciado na porta ${port}`)
);
