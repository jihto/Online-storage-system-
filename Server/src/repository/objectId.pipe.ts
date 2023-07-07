import { BadRequestException, Injectable, PipeTransform, Type } from "@nestjs/common";
import { Types, ObjectId } from "mongoose";


interface ArgumentMetadata{
    type: 'body' | 'query' | 'param' | 'custom';
    metatype?: Type<unknown>;
    data?: string;
}

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, string>{
    transform(value: ObjectId, metadata: ArgumentMetadata): string {
        try {
            const transformedObjectId:string = value.toString();
            return transformedObjectId;
        } catch (error) {
            throw new BadRequestException('Validation failed (ObjectId is expected)');   
        }
    }
}