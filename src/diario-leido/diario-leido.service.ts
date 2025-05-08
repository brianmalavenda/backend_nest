import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDiarioLeidoDto } from './dto/create-diario-leido.dto';
import { PrismaService } from 'prisma.service'

@Injectable()
export class DiarioLeidoService {
    constructor(private readonly prisma:PrismaService){
    }

   getAllDiariosLeidoPorUsuario(id:string){
          const listadoDiarios = this.prisma.diario.findMany({
              take: 10,
              where: {
                  id: id
              }
          });            
  
          return listadoDiarios; 
      }
  
      async createDiarioLeidoPorUsuario(registrarlectura: CreateDiarioLeidoDto){        
          
          await this.prisma.user.findFirst({
              select:{
                  id: true
              },
              where: {
                  id: registrarlectura.usuario_id
              }
          }).then(async(usuarioEncontrado) => {
              if(!usuarioEncontrado)
                  throw new NotFoundException(`El usuario ${registrarlectura.usuario_id} no existe `);
          });
  
          registrarlectura.siglas.forEach(async (diario) => {
              await this.prisma.diario.findFirst({
                  select:{    
                      id: true
                  },
                  where: {
                      sigla: diario
                  }
              }).then(async(diarioEncontrado) => {
                  if(!diarioEncontrado)
                      throw new NotFoundException(`El diario ${diario} no existe `);
  
                  await this.prisma.diarioLeido.create({
                      data: {
                          userId: registrarlectura.usuario_id,
                          diarioId: diarioEncontrado.id,
                          fecha: new Date(registrarlectura.fecha)
                      }
                  });
  
                  console.log(`DIA:${registrarlectura.fecha} : Diario ${diario} de id ${diarioEncontrado.id} registrado que fue leido por el usuario ${registrarlectura.usuario_id}`);
              });
          });
  
          return "ok";
      }

}
