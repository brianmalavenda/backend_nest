import { IsUUID, IsDateString, IsOptional } from 'class-validator'

export class CreateLecturaDto{
    @IsUUID()
    @IsOptional()
    usuario_id: string;

    @IsUUID()
    diario_id: string;

    @IsDateString()
    fecha: Date; // formato ISO 8601
} 