import { Injectable } from '@nestjs/common';
export interface Usuario {
    name: string;
    email: string;
    password: string;
    id: number;
}

@Injectable()
export class UsuarioService {

    private usuarios = new Array<Usuario>;

    getUsario(id: number) {
        const usuarioEncontrado = this.usuarios.find(item => item.id === id);
        return usuarioEncontrado
    }  
    
    getAllUsario() {
        console.log("Obtener todos los usuarios");
        return this.usuarios;
    }  

    createUsario(usuario: Usuario) {
        this.usuarios.push({ ...usuario, id: this.usuarios.length + 1 });

        return "Nuevo usuario creado";
    }   
}
