import {ApproveStatus} from '../../../model/closed-road-violation.types';

export interface IStatusComponent {
    status: ApproveStatus;
}
export interface IStatus {
    status: ApproveStatus;
    onClick?: () => void;
}
