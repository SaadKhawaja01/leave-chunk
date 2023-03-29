export interface ILeaveApplication {
  toDate: Date;
  fromDate: Date;
  leaveType: string;
  descriptionLeave: string;
  reason: string;
}

export interface IAllowedLeaves {
  leaveType: string;
  allowedLeaves: number;

}

export interface ILeaveApplicationResponse {
  id: string;
  employeeId: string;
  applcationDate: Date;
  allowedLeaves: number;
  consumedLeaves: number;
  availableLeaves: number;
  description: string;
  leaveDates: string;
  status: string;
}
