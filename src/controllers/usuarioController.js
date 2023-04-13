// Importa o bd.js para poder usar o banco de dados simulado
import { bdUsuarios } from "../bd.js"
import UsuarioDAO from "../DAO/UsuarioDAO.js"

class usuarioController {
    static rotas(app){
        // Rota para o recurso usuario
        app.get('/usuario', usuarioController.listar)
        app.post('/usuario', usuarioController.inserir)
        app.post("/usuario/:email", usuarioController.filtrarPorEmail)
        app.delete("/usuario/:email", usuarioController.apagarUsuario)
        app.put("/usuario/:email", usuarioController.atualizarUsuario)
    }

    static listar(req, res){
        const resultado = UsuarioDAO.listar()
        res.send(resultado)
  
    }

    static inserir(req, res){
        res.send('Rota ativada com POST e recurso usuario: usuario deve ser inserido')
        // Console log do corpo da requisição
        console.log(req.body)        
    }

    static filtrarPorEmail(req, res){
        const [usuario] = bdUsuarios.filter((usuario) => usuario.email === req.params.email)
        res.send(usuario)
        console.log(usuario)
    }

    static apagarUsuario(req, res){
        let index;
        const [usuario] = bdUsuarios.filter((usuario, i) => {
            if(usuario.email === req.params.email){
                index = i;
            }
           return  usuario.email === req.params.email
        })
        bdUsuarios.splice(index, 1)
        console.log(usuario)
        res.send(`usuario: ${usuario.nome}, index: ${index}`)
    }

    static atualizarUsuario(req, res) {
        let index;
        const [usuario] = bdUsuarios.filter((usuario, i) => {
            if(usuario.email === req.params.email){
                index = i;
            }
           return  usuario.email === req.params.email
        })

        bdUsuarios[index].nome = req.body.nome;
        bdUsuarios[index].email = req.body.email;
        bdUsuarios[index].senha = req.body.senha;
    
        res.send("Usuario alterado com sucesso")
    }
}

export default usuarioController