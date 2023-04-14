import db from "../infra/db.js";

class UsuarioDAO {

    // GET -- Listar todos os usuários
    static listar() {
        const query = "SELECT * FROM USUARIOS"
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err)
                }
                resolve(rows)
            })
        })
    }
     
    // POST  --  Criar um novo usuário
    static inserir(usuario){
         const query = `INSERT INTO USUARIOS (nome, email, senha) VALUES (?, ?, ?)`;

         return new Promise((resolve, reject) => {
             db.run(query, [usuario.nome, usuario.email, usuario.senha], (err) =>{
                if (err){
                     reject({
                        mensagem: "Erro ao inserir o usuário",
                        error:err,
                   });
               }
              resolve(usuario);
           });
       });
    }
    
    // GET -- BUSCAR POR EMAIL
    static buscarPorEmail(email) {
        const query = "SELECT * FROM USUARIOS WHERE email = ?";
        return new Promise((resolve, reject) => {
          db.get(query, [email], (err, row) => {
            if (err) {
              reject(false);
            }
            resolve(row);
          });
        });
      }

    static buscarPorID(id) {
        const query = "SELECT * FROM USUARIOS WHERE id = ?";
        return new Promise((resolve, reject) => {
          db.get(query, [id], (err, row) => {
            if (err) {
              reject(false);
            }
            resolve(row);
          });
        });
      }

  // PUT  --  
  static atualizar(id, usuario){
    const query =
    "UPDATE USUARIOS SET nome = ?, email = ?, senha = ? WHERE id = ?";
    return new Promise((resolve, reject) =>{
      db.run(
        query,
        [usuario.nome, usuario.email, usuario.endereco, id],
        (err)=>{
          if (err){
            reject({
              mensagem: "Erro ao atualizar o usuário",
              erro: err,
            });
          }
          resolve({
            mensagem: "Usuário atualizado com sucesso"
          });
        }
      );


    });
  }   

    // DELETE -- Deletar um usuário pelo Email
    static deletar(email){
        const query = "DELETE FROM USUARIOS WHERE email = ?";
        return new Promise((resolve,reject) =>{
          db.run(query, [email], (err) =>{
            if(err){
              reject({
                mensagem: "Erro ao deletar o seu usuário",
                erro: err,
              });
            }
            resolve({mensagem: "Usuário deletado com sucesso", email: email});
          });
        });
      }   
}

export default UsuarioDAO