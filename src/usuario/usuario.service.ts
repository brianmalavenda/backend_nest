import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

export interface Usuario {
    name: string;
    email: string;
    password: string;
    id: number;
}

@Injectable()
export class UsuarioService {

    // Usando prisma para persistir datos en la base de datos
    constructor(private prisma:PrismaService){
        
    }

    getAllUsarios() {
        return this.prisma.user.findMany();
    }  

    newUsuario(user:CreateUserDto) {
        return this.prisma.user.create({data: user});
    }
}
