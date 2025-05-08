import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiarioLeidoService } from './diario-leido.service';
import { CreateDiarioLeidoDto } from './dto/create-diario-leido.dto';

@Controller('registrarlectura')
export class DiarioLeidoController {
     constructor(private diarioService:DiarioLeidoService){}
 
     @Get('/:id')
     getAllDiariosLeidoPorUsuario(@Param('id') id:string){
         const result = this.diarioService.getAllDiariosLeidoPorUsuario(id);
         console.log(result);
         return result;
     }
 
     @Post()
     createDiarioLeidoPorUsuario(@Body() listadoDiarios:CreateDiarioLeidoDto){
         return this.diarioService.createDiarioLeidoPorUsuario(listadoDiarios);
     }

  // @Post()
  // create(@Body() createDiarioLeidoDto: CreateDiarioLeidoDto) {
  //   return this.diarioLeidoService.create(createDiarioLeidoDto);
  // }

  // @Get()
  // findAll() {
  //   return this.diarioLeidoService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.diarioLeidoService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDiarioLeidoDto: UpdateDiarioLeidoDto) {
  //   return this.diarioLeidoService.update(+id, updateDiarioLeidoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.diarioLeidoService.remove(+id);
  // }
}
