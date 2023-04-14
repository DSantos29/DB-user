// Importa o bd.js para poder usar o banco de dados simulado
import { bdUsuarios } from "../bd.js"
import UsuarioDAO from "../DAO/UsuarioDAO.js"
import Usuario from "../models/Usuario.js"

class usuarioController {
    static rotas(app){
        // Rota para o recurso usuario
        app.get('/usuario', usuarioController.listar)
        app.post('/usuario', usuarioController.inserir)
        app.get("/usuario/:email", usuarioController.filtrarPorEmail)
        app.delete("/usuario/:email", usuarioController.apagarUsuario)
        app.put("/usuario/id/:id", usuarioController.atualizarUsuario)
    }
    
    // GET -- Listar todos os usuários
    static async listar(req, res){
        const resultado = await UsuarioDAO.listar()
        res.send(resultado)
  
    }
    
    // POST  --  Criar um novo usuário
    static async inserir(req, res) {
        const usuario = {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha
        }

        if (!usuario || !usuario.nome || !usuario.email || !usuario.senha) {
            res.status(400).send("Precisa passar as informações")
            return
        }


        const result = await UsuarioDAO.inserir(usuario)


        if (result.erro) {
            res.status(500).send(result)
        }

        res.status(201).send({ "Mensagem": "usuario criado com sucesso", "Novo usuario: ": usuario })
    }

    // GET -- BUSCAR POR EMAIL
    static async filtrarPorEmail(req, res){
        const usuario = await UsuarioDAO.buscarPorEmail(req.params.email)

        if (!usuario) {

            res.status(404).send("usuario não encontrado")
        }

        res.status(200).send(usuario)      
    }
    
    // DELETE -- Deletar um usuário pelo email
    static async apagarUsuario(req, res){
       const usuario = await UsuarioDAO.buscarPorEmail(req.params.email)

       if(!usuario){
           res.status(404).send("Usuário não encontrado")
           return
       }

       const result = await UsuarioDAO.deletar(req.params.email)

       if(result.erro){
            res.status(400).send({ 'Mensagem': 'Usuário não deletado' })
            return
       }

       res.status(200).send(result)
    }

    // PUT -- Atualizar um usuário
    static async atualizarUsuario(req, res) {
        const id = await UsuarioDAO.buscarPorID(req.params.id)
        if (!id) {
            res.status(404).send('usuario não encontrado')
            return
        }

        const usuario = new Usuario(req.body.nome, req.body.email, req.body.senha)



        if (!usuario || !usuario.nome || !usuario.email || !usuario.senha) {
            res.status(400).send("Precisa passar todas as informações")
            return
        }

        if (!Object.keys(usuario).length) {
            res.status(400).send('O objeto está sem chave')
            return
        }

        const result = await UsuarioDAO.atualizar(req.params.id, usuario)

        if (result.erro) {
            res.status(500).send('Erro ao atualizar o usuario')
            return
        }

        res.status(200).send({ "Mensagem": "Dados atualizados", "usuario: ": usuario })

    }      
}

export default usuarioController
