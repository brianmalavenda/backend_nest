import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiarioLeidoService } from './diario-leido.service';
import { CreateDiarioLeidoDto } from './dto/create-diario-leido.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('registrarlectura')
export class DiarioLeidoController {
     constructor(private diarioService:DiarioLeidoService){}
 
     @Get('/:id')
     @ApiOperation({ summary: 'Obtener un listado de todos los diarios leidos por un usuario' })
     getAllDiariosLeidoPorUsuario(@Param('id') id:string){
         const result = this.diarioService.getAllDiariosLeidoPorUsuario(id);
         console.log(result);
         return result;
     }
 
     @Post()
     @ApiOperation({ summary: 'Crear un registro del dia con los diarios leidos por un usuario' })
     createDiarioLeidoPorUsuario(@Body() listadoDiarios:CreateDiarioLeidoDto){
         return this.diarioService.createDiarioLeidoPorUsuario(listadoDiarios);
     }
}
