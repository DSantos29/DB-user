import db from "../infra/db.js";

class UsuarioDAO {
    static listar() {
        const query = "SELECT * FROM USUARIOS"
        return new Promise ((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err)
                }
                resolve(rows)
            })
        })
    }
}


export default UsuarioDAO