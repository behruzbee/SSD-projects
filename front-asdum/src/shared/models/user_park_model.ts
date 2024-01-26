import {NameIdModel} from './name_id_model';

export interface IUserParkModel extends NameIdModel {
    licenseNumber: string;
    remark: string;
    shortName: string;
}
