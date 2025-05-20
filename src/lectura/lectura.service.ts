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
  
      async createDiarioLeidoPorUsuario(lectura: CreateLecturaDto){        
          
          await this.prisma.user.findFirst({
              select:{
                  id: true
              },
              where: {
                  id: lectura.usuario_id
              }
          }).then(async(usuarioEncontrado) => {
              if(!usuarioEncontrado)
                  throw new NotFoundException(`El usuario ${lectura.usuario_id} no existe `);
          });
  
          await this.prisma.lectura.findFirst({
          });

        //     forEach(async (diario) => {
        //       await this.prisma.diario.findFirst({
        //           select:{    
        //               id: true
        //           },
        //           where: {
        //               sigla: diario
        //           }
        //       }).then(async(diarioEncontrado) => {
        //           if(!diarioEncontrado)
        //               throw new NotFoundException(`El diario ${diario} no existe `);
  
        //           await this.prisma.diarioLeido.create({
        //               data: {
        //                   userId: lectura.usuario_id,
        //                   diarioId: diarioEncontrado.id,
        //                   fecha: new Date(lectura.fecha)
        //               }
        //           });
  
        //           console.log(`DIA:${lectura.fecha} : Diario ${diario} de id ${diarioEncontrado.id} registrado que fue leido por el usuario ${lectura.usuario_id}`);
        //       });
        //   });
  
          return "ok";
      }

}
