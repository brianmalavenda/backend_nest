import { Body, Controller, Get, Param, Post, Put, Query} from '@nestjs/common';
import { DiarioService } from './diario.service';
import { CreateDiarioDto } from './dto/create-diario.dto';
import { UpdateDiarioDto } from './dto/update-diario.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('diario')
export class DiarioController {
    constructor(private diarioService:DiarioService){}

    @Get()
    @ApiOperation({ summary: 'Obtener el listado de todos los diarios registrados' })
    getAllDiarios(@Query() query:any){
        return this.diarioService.getAllDiarios();
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Obtener la informacion de un diario' })
    getDiario(@Param('id') id:string){
        return this.diarioService.getDiario(id);
    }

    @Post()
    @ApiOperation({ summary: 'Crear un diario' })
    createDiario(@Body() diario:CreateDiarioDto){
        return this.diarioService.createDiario(diario);
    }

    @Put('/:id')
    @ApiOperation({ summary: 'Modificar un diario' })
    updateDiario(@Param('id') id:string,@Body() diario:UpdateDiarioDto){
        return this.diarioService.updateDiario(id, diario);
    }
}
