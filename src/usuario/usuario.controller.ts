import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UsuarioService } from './usuario.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import * as bcrypt from 'bcryptjs';
import createAccessToken from 'src/auth/createAccessToken';
import { throwError } from 'rxjs';

@Controller('usuario')
export class UsuarioController {
    constructor(private usuarioService:UsuarioService){
    }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo usuario' })
    async newUsuario(@Body() user:CreateUserDto, @Res() res: Response) {
        console.log("asdffffffffffffffff");
        try{
            const passHash = await bcrypt.hash(user.password,10)
            const usuarioHash = {
                ...user,
                password: passHash,
                isEnable: true,
            }
            
            const userSave = await this.usuarioService.newUsuario(usuarioHash);
            const token = await createAccessToken(userSave.id);
            
            // ✅ Guardar el token en una cookie
            res.cookie('access_token', token, {
            httpOnly: true,       // previene acceso desde JS del cliente
            secure: false,        // poner en true si usas HTTPS
            maxAge: 24 * 60 * 60 * 1000, // 1 día
            });

            // ✅ Devolver también una respuesta
            return res.status(201).json({
            message: 'Usuario creado correctamente',
            user: userSave,
            });
        }catch(e){
            console.log(e);
        }
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los usuarios' })
    @ApiResponse({ status: 200, description: 'Lista de usuarios' })
    getAllUsuarios() {
        return this.usuarioService.getAllUsarios();
    }
}
