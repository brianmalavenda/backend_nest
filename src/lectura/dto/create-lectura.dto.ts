import { IsArray, IsString, ArrayNotEmpty, IsUUID, IsDateString } from 'class-validator'

export class CreateLecturaDto{
    @IsUUID()
    usuario_id: string;

    @IsUUID()
    diario_id: string;

    @IsDateString()
    fecha: Date; // formato ISO 8601
} 