import { IsOptional, IsString } from 'class-validator'

export class UpdateDiarioDto{

    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsString()
    sigla?: string
} 