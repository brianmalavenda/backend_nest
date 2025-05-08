import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDiarioDto } from './dto/create-diario.dto';
import { UpdateDiarioDto } from './dto/update-diario.dto';
import { PrismaService } from 'prisma.service';

@Injectable()
export class DiarioService {
    constructor(private readonly prisma:PrismaService){
    }

    getAllDiarios(){
        return this.prisma.diario.findMany();
    }

    getDiario(id:string){
        const diarioEncontrado = this.prisma.diario.findUnique({
            where: {
                id: id
            }
        });

        if(!diarioEncontrado)
            throw new NotFoundException(`El diario buscado no existe - id: ${id}`);

        return diarioEncontrado
    }

    async createDiario(diario: CreateDiarioDto){
        const diarioID = await this.prisma.diario.findFirst({
            select:{
                id: true
            },
            where: {
                name:{
                    contains: diario.name
                }
            }
        }); 

        if(diarioID)
            throw new NotFoundException(`El diario ya existe - id: ${diarioID}`);
        
        return await this.prisma.diario.create({
            data: {
                name: diario.name,
                sigla: diario.sigla
            }
        });
    }

    async updateDiario(id:string, diario:UpdateDiarioDto){
        const diarioID = await this.prisma.diario.findFirst({
            select:{
                id: true
            },
            where: {
                id:id
            }
        }); 

        if(!diarioID)
            throw new NotFoundException(`El diario ${diario.name} no existe`);
        
        return await this.prisma.diario.update({
            where: {
                id: id
            },
            data: {
                name: diario.name,
                sigla: diario.sigla
            }
        });
    };

    // deleteDiario(){
    //     return "delete diario";
    // }
}
