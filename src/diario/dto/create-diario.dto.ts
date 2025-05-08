import { IsString, MinLength } from 'class-validator'

export class CreateDiarioDto{
    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    @MinLength(1)
    sigla: string;
} 