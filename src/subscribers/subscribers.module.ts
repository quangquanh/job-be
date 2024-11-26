import { Module } from '@nestjs/common';
import { Subscriber, SubscriberSchema } from './schemas/subscriber.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscribersController } from './subscribers.controller';
import { SubscribersService } from './subscribers.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subscriber.name, schema: SubscriberSchema },
    ]),
  ],
  controllers: [SubscribersController],
  providers: [SubscribersService],
  exports: [SubscribersService],
})
export class SubscribersModule {}
