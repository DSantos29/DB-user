import express from 'express';
import cors from 'cors'
import UsauarioController from './src/controllers/usuarioController.js';

// Importando o express

const app = express();
const port = 3000

//O middleware "express.json()" irá converter esse JSON em um objeto JavaScript que pode ser manipulado pelo servidor. 
app.use(express.json());
app.use(cors())


UsauarioController.getUsauarioController(app)


//Servidor rodando na porta 3000
app.listen(`${port}`, () =>
console.log(`Servidor iniciado na porta ${port}`)
);
