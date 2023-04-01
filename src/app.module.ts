import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { LeaveModule } from './leave/leave.module';
import { Leave } from './leave/leave.entity';
import { Allowed } from './leave/allowed.entity';

//for Sql Db
const DB = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'leaveattendance',
  entities: [Leave, Allowed],
  synchronize: true,
});

// all modules imports here
@Module({
  imports: [DB, LeaveModule],
  controllers: [AppController],

  providers: [AppService],
})
export class AppModule { }
