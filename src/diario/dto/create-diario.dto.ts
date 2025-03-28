import { IsString, MinLength } from 'class-validator'

export class CreateDiarioDto{
    @IsString()
    @MinLength(1)
    nombre: string;

    @IsString()
    @MinLength(1)
    siglas: string;

    @IsString()
    @MinLength(1)
    autor: string;
} 