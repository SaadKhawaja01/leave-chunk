import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Allowed } from './allowed.entity';
import { IAllowedLeaves, ILeaveApplication } from './leave.dto';
import { Leave } from './leave.entity';

@Injectable()
export class LeaveService {
  async allowedLeaves(data: IAllowedLeaves) {
    //to get the value between these three
    if (
      data.leaveType !== 'earnedLeaves' &&
      data.leaveType !== 'casualLeaves' &&
      data.leaveType !== 'compensatoryLeaves'
    ) {
      throw new HttpException(
        'you must enter the type of leave between casualLeaves , compensatoryLeaves &  earnedLeaves',
        HttpStatus.BAD_REQUEST,
      );
    }

    const application = new Allowed();
    application.leaveType = data.leaveType;
    application.allowedLeaves = data.allowedLeaves;
    application.remainingLeaves = data.allowedLeaves;
    await application.save();
    return application;
  }

  async Leaves() {
    const allowedLeavesData = await Allowed.find();

    return allowedLeavesData;
  }

  async application(data: ILeaveApplication) {
    // to get number of days
    let test = data.toDate.toString().split('T'); //T replace
    let test2 = test[0].toString().split('-');
    let date1 = test2[2];
    let test3 = data.fromDate.toString().split('T'); //T replace
    let test4 = test3[0].toString().split('-');
    let date2 = test4[2];
    let diff = parseInt(date2) - parseInt(date1) + 1;

    //updating consumed leaves
    if (data.descriptionLeave == 'Casual') {
      const Leavesdata = await Allowed.findOneBy({ leaveType: 'casualLeaves' });

      //to check remaining leaves is not zero
      if (Leavesdata.remainingLeaves - diff < 0) {
        throw new HttpException(
          'you have consumend maximum number of leaves, your remaining leaves is : ' +
            Leavesdata.remainingLeaves,
          HttpStatus.BAD_REQUEST,
        );
      }
      //updating data
      Leavesdata.consumedLeaves += diff;
      Leavesdata.remainingLeaves =
        Leavesdata.allowedLeaves - Leavesdata.consumedLeaves;
      await Leavesdata.save();
    } else if (data.descriptionLeave == 'Compensatory') {
      const Leavesdata = await Allowed.findOneBy({
        leaveType: 'compensatoryLeaves',
      });

      //to check remaining leaves is not zero
      if (Leavesdata.remainingLeaves - diff < 0) {
        throw new HttpException(
          'you have consumend maximum number of leaves, your remaining leaves is : ' +
            Leavesdata.remainingLeaves,
          HttpStatus.BAD_REQUEST,
        );
      }
      //updating data
      Leavesdata.consumedLeaves += diff;
      Leavesdata.remainingLeaves =
        Leavesdata.allowedLeaves - Leavesdata.consumedLeaves;
      await Leavesdata.save();
    } else {
      const Leavesdata = await Allowed.findOneBy({ leaveType: 'earnedLeaves' });

      //to check remaining leaves is not zero
      if (Leavesdata.remainingLeaves - diff < 0) {
        throw new HttpException(
          'you have consumend maximum number of leaves, your remaining leaves is : ' +
            Leavesdata.remainingLeaves,
          HttpStatus.BAD_REQUEST,
        );
      }
      //updating data
      Leavesdata.consumedLeaves += diff;
      Leavesdata.remainingLeaves =
        Leavesdata.allowedLeaves - Leavesdata.consumedLeaves;
      await Leavesdata.save();
    }

    //creation of new application
    const leave = new Leave();
    leave.toDate = data.toDate;
    leave.fromDate = data.fromDate;
    leave.leaveType = data.leaveType;
    leave.descriptionLeave = data.descriptionLeave;
    leave.reason = data.reason;
    await leave.save();

    const allowedLeavesData = await Allowed.find();

    return {
      ...leave,
      leaveinfo: allowedLeavesData,
    };
  }
}
