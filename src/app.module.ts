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
  host: 'containers-us-west-133.railway.app',
  port: 7969,
  username: 'root',
  password: 'AdV0KC7xXErt00gZpCU3',
  database: 'railway',
  entities: [Leave, Allowed],
  synchronize: true,
});

// all modules imports here
@Module({
  imports: [DB, LeaveModule, ],
  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
