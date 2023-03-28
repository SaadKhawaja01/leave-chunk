
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IAllowedLeaves, ILeaveApplication } from './leave.dto';



export class LeaveApplication implements ILeaveApplication {
  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  toDate: Date;
  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  fromDate: Date;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  leaveType: string
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  descriptionLeave: string;
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  reason: string;
}



export class AllowedLeaves implements IAllowedLeaves {
    @ApiProperty()
  @IsNotEmpty()
  @IsString()
  casualLeaves: string;
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  compensatoryLeaves: string;
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  earnedLeaves: string;
}