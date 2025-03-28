import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDiarioDto } from './dto/create-diario.dto';
import { UpdateDiarioDto } from './dto/update-diario.dto';

@Injectable()
export class DiarioService {
    private diarios = Array();

    getDiarios(){
        return this.diarios;
    }

    getDiario(id:number){
        const diarioEncontrado = this.diarios.find( item => item.id === id);

        if(!diarioEncontrado)
            throw new NotFoundException(`El diario buscado no existe - id: ${id}`);

        return diarioEncontrado
    }

    createDiario(diario: CreateDiarioDto){
        this.diarios.push({
            ...diario, 
            id: this.diarios.length + 1
        });
        
        return this.diarios;
    }

    updateDiario(id:number, diario:UpdateDiarioDto){
        let indiceDiarioEncontrado = -1;
        indiceDiarioEncontrado = this.diarios.findIndex(item => item.id === id);
        
        if(indiceDiarioEncontrado < 0)
            throw new NotFoundException(`El diario buscado no existe - id: ${id}`);
        else{
            this.diarios[indiceDiarioEncontrado] = { ...this.diarios[indiceDiarioEncontrado], ...diario };
            return this.diarios[indiceDiarioEncontrado];
        }
    }

    refreshDiario(){
        return "refresh diario";
    }

    deleteDiario(){
        return "delete diario";
    }
}
