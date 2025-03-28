import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidateuserPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {    
    if(isNaN(value.age))
      throw new HttpException('age must be a number', HttpStatus.BAD_REQUEST);

    return value;
  }
}
