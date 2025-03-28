import { Controller, Get, HttpCode, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ValidateuserPipe } from './pipes/validate/validateuser/validateuser.pipe';
import { AuthGuard } from './guards/auth/auth.guard';

@Controller()
export class PageController {

    @Get('notfound')
    @HttpCode(404)
    pageNotFound(){
        return "Página no encontrada - Status 404 Error";
    }

    @Get('error')
    @HttpCode(500)
    error(){
        return "Error en el servidor  - Status 500 Error";
    }

    @Get('ticket/:num')
    getNumber(@Param('num', ParseIntPipe) num:number){
        return num + 7;
    }

    /**
     * 
     * @param query 
     * @returns {String} 
     * @description manejo de pipeline sde validacion de datos
     */
    @Get('greet') //
    @UseGuards(AuthGuard)
    greet(@Query(ValidateuserPipe) query:{name:string, age:number}){
        console.log(typeof query.name);  
        console.log(typeof query.age); 
        return `Hello ${query.name} - ${query.age} years old`;
    }
}
