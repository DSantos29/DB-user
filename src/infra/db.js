import Usuario from "../model/usuario.js";

const dbUser = []

const usuario = new Usuario ("Danilo", "Santos", "useremail@gmail.com", "1234" )
dbUser.push(usuario)

export { dbUser }