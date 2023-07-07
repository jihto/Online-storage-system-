import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports:[
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport:{
          host: config.get('MAIL_HOST'), // IP address of the SMTP server that you want to use.
          secure: false,
          auth:{
            user: config.get('MAIL_USER'),
            pass: config.get('MAIL_PASSWORD'),
          },
        },
        defaults:{
          from:`"No Reply" <${config.get('MAIL_FROM')}>`, // The recipient of the email message know who the message is from. 
        },
        template:{
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: { strict: true },
        }
      }),
      inject: [ConfigService],
    })
  ],
  providers: [MailService],
  exports: [MailService]
})


export class MailModule {}
