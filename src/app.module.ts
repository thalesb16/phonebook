import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DSN),
    AuthModule,
    ContactsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
