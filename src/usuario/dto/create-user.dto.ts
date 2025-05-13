import { Optional } from '@nestjs/common';
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    //para el borrado lógico
    @IsBoolean()
    isEnable?: boolean = true;
}