import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLecturaDto } from './dto/create-lectura.dto';
import { PrismaService } from 'prisma.service'

@Injectable()
export class LecturaService {
    constructor(private readonly prisma:PrismaService){
    }

   async getDiasConLecturaPorUsuario(id:string){
          const listadoDias = await this.prisma.lectura.findMany({
              where: {
                  userId: id
              },
              select: {
                fecha: true,
            },
          });            
 
          const listadoDiasString: string[] = listadoDias.map(item => item.fecha.toISOString())

          return listadoDiasString; 
      }
  
      async createLecturaPorUsuario(lectura: CreateLecturaDto){        
        await this.prisma.lectura.create({
                      data: {
                          userId: lectura.usuario_id,
                          diarioId: lectura.diario_id,
                          fecha: lectura.fecha
                      }
                  });

          return "Lectura cargada correctamente";
      }

}
