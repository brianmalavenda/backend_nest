import { Body, Controller, Get, Param, Post} from '@nestjs/common';
import { Usuario, UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
    constructor(private usuarioService:UsuarioService){
        
    }

    @Get('/:id')
    getUsuario(@Param('id') id:string) {
        return this.usuarioService.getUsario(parseInt(id));
    }

    @Get()
    getUsuarios() {
        return this.usuarioService.getAllUsario();
    }

    @Post()
    createUsuario(@Body() usuario:Usuario) {
        console.log(usuario);
        return this.usuarioService.createUsario(usuario)
    }
}
