import { MailerService } from '@nestjs-modules/mailer/dist';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService){}

    async sendUserConfirmation(email: string, token: string){
        const url  = `example.com/auth/confirm?token=${token}`;

        await this.mailerService.sendMail({
            to: email,
            subject: "Wellcome to Nice App! Confirm your Email",
            template: './comfirmation',
            context: { name: email, url },
        })
    }
}   
