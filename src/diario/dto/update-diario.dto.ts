import { IsString } from 'class-validator'

export class UpdateDiarioDto{

    @IsString()
    nombre: string

    @IsString()
    siglas: string
    
    @IsString()
    autor: string
} 