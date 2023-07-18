import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';

@Injectable()
export class ParseJwtPipe implements PipeTransform {
    constructor(private readonly jwtService: JwtService) {}

    async transform(value: string, metadata: ArgumentMetadata): Promise<JwtVerifyOptions> {
        try {
            console.log(value);
            // decode and verify the token string
            const payload = await this.jwtService.verifyAsync(value);
            console.log(payload);
            // create and return the JwtVerifyOptions object
            const options: JwtVerifyOptions = {
                secret: payload.secret,
                algorithms: payload.algorithms,
                audience: payload.audience,
                issuer: payload.issuer,
                // add any other properties you need
            };
            return options;
        } catch (error) {
            // handle any errors
            throw new BadRequestException('Invalid token');
        }
    }
}
