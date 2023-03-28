import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Allowed } from './allowed.entity';
import { AllowedLeaves, LeaveApplication } from './leave.model';

import { LeaveService } from './leave.service';

@ApiTags('Leave')
@Controller('leave')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @Post('/allowedLeaves')
  async allowedLeaves(@Body() data: AllowedLeaves) {
    return await this.leaveService.allowedLeaves(data);
  }

  @Post('/application')
  async application(@Body() data: LeaveApplication) {
    return await this.leaveService.application(data);
  }

  // @Get('/status')
  // async leaveStatus(@Req() request) {
  //   return await this.leaveService.leaveStatus(request.user);
  // }

  // @Get('/applications')
  // async leaveApplications(@Req() request) {
  //   return await this.leaveService.leaveApplications(request.user);
  // }
}
