import Usuario from "../model/usuario.js";
import { dbUser } from "../infra/db.js";

class UsauarioController{

    static getUsauarioController( app ) {

        // Visualizar todos os usuários
        app.get('/usuario', (req, resp) =>
        resp.json(dbUser)
        );

        // Visualizar um usuário 
        app.get('/usuario/:index', (req, resp) => {
            const { index } = req.params;
            resp.json(dbUser[index]);
        })

       // Visualizar um usuário 
        app.post('/usuario/:email', (req, resp) => {
            const buscarEmail = dbUser.filter((elemento) => elemento.email === req.params.email)
            resp.send(buscarEmail)
            
        })
        
        // Adicionando usuário
        app.post('/usuario' , (req, resp) => {
          const { nome, sobrenome, email, senha } = req.body
          const usuarioAInserir = new Usuario ( nome, sobrenome, email, senha )
          dbUser.push(usuarioAInserir)
          console.log( nome, sobrenome, email, senha )
          resp.json(dbUser)
        })

        // Atualizar dados de um usuário 
        app.put('/usuario/:email', (req, resp) => {
        let index ;
         
        const [ usuario ] = dbUser.filter((usuario, i) => {
            if(usuario.email === req.params.email){
                index = i
            }
            return usuario.email === req.params.email
        })

        const { nome, sobrenome, email, senha } = req.body;
        
        dbUser[index].nome = nome !== true ? dbUser[index].nome : nome
        dbUser[index].sobrenome = sobrenome !== true ? dbUser[index].sobrenome : sobrenome
        dbUser[index].email =  email !== true ? dbUser[index].email : email
        dbUser[index].senha = senha !== true ? dbUser[index].senha : senha
       
        console.log( nome, sobrenome, email, senha )
        resp.json(dbUser)

        })
        
        // Excluir um usuário
        app.delete('/usuario/:index', (req, resp) => {
            let index ;
            const [usuario] = dbUser.filter((usuario, i) => {
                if(usuario.email === req.params.email){
                    index = i
                }
                return usuario.email === req.params.email
            })
            
            dbUser.splice(index, 1)
            resp.json(dbUser)
        })
    
    }
}


export default UsauarioController;
