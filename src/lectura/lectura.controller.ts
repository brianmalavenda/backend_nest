import { Controller, Get, Post, Body, Param, Req, Res, UnauthorizedException, NotFoundException} from '@nestjs/common';
import { Request, Response } from 'express';
import { LecturaService } from './lectura.service';
import { CreateLecturaDto } from './dto/create-lectura.dto';
import { ApiOperation } from '@nestjs/swagger';
import { validateAccessToken } from '../auth/jwt';

@Controller('lectura')
export class LecturaController {
     constructor(private lecturaService:LecturaService){}
 
     @Get('/:id')
     @ApiOperation({ summary: 'Obtener un listado de todos días que el usuario tiene cargados lectura' })
     async getDiasConLecturaPorUsuario(@Param('id') id:string){
         const result = await this.lecturaService.getDiasConLecturaPorUsuario(id);
         return result;
     }
 
     @Post()
     @ApiOperation({ summary: 'Crear un registro del dia con los diarios leidos por un usuario' })
     async createLecturaPorUsuario(@Body() lecturaDiario:CreateLecturaDto, @Req() req: Request, @Res() res:Response){
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
                        
                        const nuevaLectura = {
                            ...lecturaDiario,
                            usuario_id: userId
                        }

                        await this.lecturaService.createLecturaPorUsuario(nuevaLectura);
                        // if(!userFound){
                        //     console.log("Usuario no encontrado, token inválido");
                        //     throw new NotFoundException("Usuario no encontrado, token inválido");
                        // }
        
                        // return res.json(userFound);
                    }
                }catch(err){
                    console.log("Error al decodificar el token");
                    throw new NotFoundException("Error al decodificar el token");
                }

        //  return this.lecturaService.createLecturaPorUsuario(listadoDiarios);
     }
}
