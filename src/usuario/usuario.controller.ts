import { Body, Controller, Get, Param, Post} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('usuario')
export class UsuarioController {
    constructor(private usuarioService:UsuarioService){
        
    }

    // @Get('/:id')
    // getUsuario(@Param('id') id:string) {
    //     return this.usuarioService.getUsario(parseInt(id));
    // }

    // @Get()
    // getUsuarios() {
    //     return this.usuarioService.getAllUsario();
    // }

    // @Post()
    // createUsuario(@Body() usuario:Usuario) {
    //     console.log(usuario);
    //     return this.usuarioService.createUsario(usuario)
    // }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo usuario' })
    newUsuario(@Body() user:CreateUserDto) {
        return this.usuarioService.newUsuario(user);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los usuarios' })
    @ApiResponse({ status: 200, description: 'Lista de usuarios' })
    getAllUsuarios() {
        return this.usuarioService.getAllUsarios();
    }
}
