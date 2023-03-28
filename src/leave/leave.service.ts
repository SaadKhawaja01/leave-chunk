import { Injectable } from '@nestjs/common';
import { Allowed } from './allowed.entity';
import { IAllowedLeaves, ILeaveApplication } from './leave.dto';
import { Leave } from './leave.entity';

// import { HttpStatus } from '@nestjs/common/enums';
// import { HttpException } from '@nestjs/common/exceptions';
// import { ILeaveApplication, ILeaveApplicationResponse } from './leave.dto';
// import { Leave } from './leave.entity';

@Injectable()
export class LeaveService {
  async allowedLeaves(data: IAllowedLeaves) {
    const allowedLeaves = new Allowed();
    allowedLeaves.casualLeaves = data.casualLeaves;
    allowedLeaves.compensatoryLeaves = data.compensatoryLeaves;
    allowedLeaves.earnedLeaves = data.earnedLeaves;
    await allowedLeaves.save();
    return allowedLeaves;
  }

  async application(data: ILeaveApplication) {
    // to get number of days
    let test = data.toDate.toString().split('T'); //T replace
    let test2 = test[0].toString().split('-');
    let date1 = test2[2];
    let test3 = data.fromDate.toString().split('T'); //T replace
    let test4 = test3[0].toString().split('-');
    let date2 = test4[2];
    let diff = parseInt(date2) - parseInt(date1);


    if (data.descriptionLeave == 'Casual') {
      const Leavesdata = await Allowed.find();
      const allowedLeaves = Leavesdata[0];
      let updated = parseInt(allowedLeaves.casualLeaves);
      updated -= diff;
      allowedLeaves.casualLeaves = updated.toString();
      await allowedLeaves.save();
    } else if (data.descriptionLeave == 'Compensatory') {
      const Leavesdata = await Allowed.find();
      const allowedLeaves = Leavesdata[0];
      let updated = parseInt(allowedLeaves.compensatoryLeaves);
      updated -= diff;
      allowedLeaves.compensatoryLeaves = updated.toString();
      await allowedLeaves.save();
    } else {
      const Leavesdata = await Allowed.find();
      const allowedLeaves = Leavesdata[0];
      let updated = parseInt(allowedLeaves.earnedLeaves);
      updated -= diff;
      allowedLeaves.earnedLeaves = updated.toString();
      await allowedLeaves.save();
    }

    const leave = new Leave();
    leave.toDate = data.toDate;
    leave.fromDate = data.fromDate;
    leave.leaveType = data.leaveType;
    leave.descriptionLeave= data.descriptionLeave;
    leave.reason = data.reason;
    await leave.save();








    
  }

  //   async leaveStatus(user: Employee) {
  //     const userData = await Employee.findOneBy({ id: user.id });
  //     if (!userData) {
  //       throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
  //     }

  //     return {
  //       AllowedLeaves: userData.yearlyLeaves,
  //       ConsumedLeaves: userData.consumedLeaves,
  //     };
  //   }

  //   async leaveApplications(user: Employee) {
  //     const applications = await Leave.findBy({ employeeId: user.id });

  //     return applications;
  //   }
}
