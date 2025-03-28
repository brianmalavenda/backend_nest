import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query} from '@nestjs/common';
// import { Req, Res } from '@nestjs/common';
// import { Request, Response} from 'express';
import { DiarioService } from './diario.service';
import { CreateDiarioDto } from './dto/create-diario.dto';
import { UpdateDiarioDto } from './dto/update-diario.dto';

export interface Diario {
    nombre: string,
    siglas: string,
    autor: string
}

@Controller('diario')
export class DiarioController {
    constructor(private diarioService:DiarioService){}

    @Get()
    getAllDiarios(@Query() query:any){
        return this.diarioService.getDiarios();
    }

    @Get('/:id')
    getDiario(@Param('id') id:string){
        return this.diarioService.getDiario(parseInt(id));
    }

    @Post()
    createDiario(@Body() diario:CreateDiarioDto){
        return this.diarioService.createDiario(diario);
    }

    @Put('/:id')
    updateDiario(@Param('id') id:string,@Body() diario:UpdateDiarioDto){
        return this.diarioService.updateDiario(parseInt(id), diario);
    }

    @Patch()
    refreshDiario(){
        return this.diarioService.refreshDiario();
    }

    @Delete()
    deleteDiario(){
        return this.diarioService.deleteDiario();
    }
}
