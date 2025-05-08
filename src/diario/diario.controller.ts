import { Body, Controller, Get, Param, Post, Put, Query} from '@nestjs/common';
import { DiarioService } from './diario.service';
import { CreateDiarioDto } from './dto/create-diario.dto';
import { UpdateDiarioDto } from './dto/update-diario.dto';

@Controller('diario')
export class DiarioController {
    constructor(private diarioService:DiarioService){}

    @Get()
    getAllDiarios(@Query() query:any){
        return this.diarioService.getAllDiarios();
    }

    @Get('/:id')
    getDiario(@Param('id') id:string){
        return this.diarioService.getDiario(id);
    }

    @Post()
    createDiario(@Body() diario:CreateDiarioDto){
        return this.diarioService.createDiario(diario);
    }

    @Put('/:id')
    updateDiario(@Param('id') id:string,@Body() diario:UpdateDiarioDto){
        return this.diarioService.updateDiario(id, diario);
    }

    // @Patch()
    // refreshDiario(){
    //     return this.diarioService.refreshDiario();
    // }

    // @Delete()
    // deleteDiario(){
    //     return this.diarioService.deleteDiario();
    // }
}
