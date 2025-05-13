import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

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

    async getAllUsarios() {
        return await this.prisma.user.findMany();
    }  

    async getUsuario(user:LoginUserDto) {
        return await this.prisma.user.findUnique({
            where: {
                email: user.email,
            },
        });
    }  

    async newUsuario(user:CreateUserDto) {
        return await this.prisma.user.create({data: user});
    }
}
