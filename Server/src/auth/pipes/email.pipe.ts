import { BadRequestException, Injectable, PipeTransform, Type } from "@nestjs/common";
import { Types, ObjectId } from "mongoose";


interface ArgumentMetadata{
    type: 'body' | 'query' | 'param' | 'custom';
    metatype?: Type<unknown>;
    data?: string;
}

@Injectable()
export class ParseEmailPipe implements PipeTransform<any, string>{
    transform(value: string, metadata: ArgumentMetadata): string {
        try { 
            const sampleRegExMail: RegExp = new RegExp('^[a-z0-9 .] \.@[a-z]{2,4}$');
            const email: string = value.toLocaleLowerCase();
            if(sampleRegExMail.test(email))
                return email;
            else
                throw new BadRequestException('Validation failed (Email is expected)'); 
        } catch (error) {
            throw new BadRequestException('Validation failed (Email is expected)');   
        }
    }
}