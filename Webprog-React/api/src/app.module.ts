import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GuestbookController } from './guestbook/guestbook.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [GuestbookController],
  providers: [],
})
export class AppModule {}