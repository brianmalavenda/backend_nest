import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LecturaService } from './lectura.service';
import { CreateLecturaDto } from './dto/create-lectura.dto';
import { ApiOperation } from '@nestjs/swagger';

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
     createDiarioLeidoPorUsuario(@Body() listadoDiarios:CreateLecturaDto){
         return this.lecturaService.createDiarioLeidoPorUsuario(listadoDiarios);
     }
}
