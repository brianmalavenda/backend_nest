import { IsArray, IsString, ArrayNotEmpty, IsUUID, IsDateString } from 'class-validator'

export class CreateLecturaDto{
    @IsUUID()
    usuario_id: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    siglas: string[];

    @IsDateString()
    fecha: Date; // formato ISO 8601
} 