import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { MailerService } from '@nestjs-modules/mailer';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import {
  Subscriber,
  SubscriberDocument,
  SubscriberSchema,
} from 'src/subscribers/schemas/subscriber.schema';
import { Job, JobDocument } from 'src/jobs/schemas/job.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private mailerService: MailerService,
    private configService: ConfigService,

    @InjectModel(Subscriber.name)
    private subscriberModel: SoftDeleteModel<SubscriberDocument>,
    @InjectModel(Job.name)
    private jobModel: SoftDeleteModel<JobDocument>,
  ) {}
  @Get()
  @Public()
  @ResponseMessage('Test email')
  async handleTestEmail() {
    const website_url = this.configService.get<string>('WEB_URL');
    console.log(website_url);

    const subscribers = await this.subscriberModel.find({});

    for (const subs of subscribers) {
      const subsSkills = subs.skills;
      const jobWithMatchingSkills = await this.jobModel.find({
        skills: { $in: subsSkills },
      });
      if (jobWithMatchingSkills?.length) {
        const jobsForSubscriber = jobWithMatchingSkills.map((item) => {
          return {
            name: item.name,
            company: item.company.name,
            salary:
              `${item.salary}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' vnđ',
            skills: item.skills,
            jobUrl: `http://localhost:4173/job/fe-developer?id=${item._id}`,
          };
        });
        await this.mailerService.sendMail({
          to: 'thanhdotft@gmail.com',
          from: '"No reply" <noreply@example.com>', // override default from
          subject: 'Mail này gửi từ app, không phải từ mail',
          template: 'new-job', // template body content
          // interface của sendMail có trường là context , trường này dùng để truyền động biến vào trong file hbs
          //
          context: {
            receiver: subs.name,
            jobs: jobsForSubscriber,
            website: website_url,
          },
        });
      }
      //build template
    }
  }
}
