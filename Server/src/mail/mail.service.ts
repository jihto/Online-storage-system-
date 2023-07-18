import { MailerService } from '@nestjs-modules/mailer/dist';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService){}

    async sendUserConfirmation(email: string, token: string, otp: number){
        const url  = `http://localhost:3333/auth/update_password/${token}`;

        await this.mailerService.sendMail({
            to: email,
            subject: "Wellcome to Nice App! Confirm your Email",
            template: './comfirmation',
            context: { email, url, otp },
        })
    }
}   
