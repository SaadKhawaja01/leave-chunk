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

  @Get()
  async Leaves() {
    return await this.leaveService.Leaves();
  }

  @Post('/application')
  async application(@Body() data: LeaveApplication) {
    return await this.leaveService.application(data);
  }
}
