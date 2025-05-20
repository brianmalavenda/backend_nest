import { Body, Controller, Get, Post, Res, Req, UnauthorizedException, NotFoundException} from '@nestjs/common';
import { Response, Request } from 'express';
import { UsuarioService } from './usuario.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiOperation } from '@nestjs/swagger';
import * as bcrypt from 'bcryptjs';
import {createAccessToken, validateAccessToken} from 'src/auth/jwt';

@Controller('auth/')
export class UsuarioController {
    constructor(private usuarioService:UsuarioService){
    }

    @Post('register')
    @ApiOperation({ summary: 'Crear un nuevo usuario' })
    async Registrarse(@Body() user:CreateUserDto, @Res() res: Response) {
        try{
            const passHash = await bcrypt.hash(user.password,10)
            const usuarioHash = {
                ...user,
                password: passHash,
                isEnable: true,
            }
            
            console.log("estoy en el back", usuarioHash.email);
            
            return res.status(201).json({
                message: 'Usuario creado correctamente',
                user: await this.usuarioService.newUsuario(usuarioHash)
            });
        }catch(e){
            console.log(e);
        }
    }

    @Post('login')
    @ApiOperation({ summary: 'Logear un usuario registrado' })
    async Login(@Body() user:LoginUserDto, @Res() res: Response) {
        try{
            // const passHash = await bcrypt.hash(user.password,10)
            const userFound = await this.usuarioService.getUsuario(user);
            
            if (!userFound?.password) {
                return res.status(400).json({ message: 'Usuario no encontrado o contraseña inválida' });
            }
            
            bcrypt.compare(user.password, userFound.password).then(async (result) => {
                if (result) {
                    // El usuario existe y la contraseña es correcta
                    const usuarioHash = {
                        ...user,
                        password: user.password,
                        isEnable: true,
                    }

                    // Generar un token de acceso
                    const token = await createAccessToken(usuarioHash.email);
                    
                    // Guardar el token en una cookie
                    res.cookie('access_token', token, {
                        httpOnly: true,       // previene acceso desde JS del cliente
                        secure: false,        // poner en true si usas HTTPS
                        maxAge: 24 * 60 * 60 * 1000, // 1 día
                    });

                    return res.status(200).json({
                        token: token,
                        user: user.email
                    });
                    // message: 'Usuario logueado correctamente',
                    // user: await this.usuarioService.getUsuario(usuarioHash),
                } else {
                    // La contraseña es incorrecta
                    return res.status(401).json({
                        message: 'Contraseña incorrecta',       
                    });
                }
            });
        }catch(e){
            console.log(e);
        }
    }

    @Get('verify')
    @ApiOperation({ summary: 'Verificar token usuario' })
    async VerifyToken(@Req() req: Request, @Res() res:Response) {
         const token = req.cookies?.['access_token'];
         console.log("aca esta el token : ",token);
        if (!token) {
            console.log("No existe el token, no authorizado");
            throw new UnauthorizedException("No existe el token, no authorizado");
        }

        try{
            const decoded = await validateAccessToken(token);
            if (decoded && typeof decoded === 'object' && 'userId' in decoded && 'iat' in decoded && 'exp' in decoded) {
                const userId = typeof decoded.userId === 'string' ? decoded.userId : String(decoded.userId);
                const userFound = await this.usuarioService.getUsuarioFromEmail(userId);
                if(!userFound){
                    console.log("Usuario no encontrado, token inválido");
                    throw new NotFoundException("Usuario no encontrado, token inválido");
                }

                return res.json(userFound);
            }
        }catch(err){
            console.log("Error al decodificar el token");
            throw new NotFoundException("Error al decodificar el token");
        }
    };

    // @Get()
    // @ApiOperation({ summary: 'Obtener todos los usuarios' })
    // @ApiResponse({ status: 200, description: 'Lista de usuarios' })
    // getAllUsuarios() {
    //     return this.usuarioService.getAllUsarios();
    // }
}
