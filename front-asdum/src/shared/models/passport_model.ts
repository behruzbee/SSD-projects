export interface IPassport {
    route_name: string;
    park: string;
    route_type: string;
    kpp1: string;
    kpp1_id: number;
    kpp2: string;
    kpp2_id: number;
    distkpp1kpp2: number;
    distkpp2kpp1: number;
    distparkkpp1: number;
    distparkkpp2: number;
    vremyakpp1kpp2: number;
    vremyakpp2kpp1: number;
    vremyaparkkpp1: number;
    vremyaparkkpp2: number;
    prostoykpp1: number;
    prostoykpp2: number;
    utrenniypikbegin: number;
    utrenniypikend: number;
    vecherniypikbegin: number;
    vecherniypikend: number;
    remark: string;
}

export interface ISavePassport {
    park_id: number;
    route_type: number;
    route_name: string;
    station_kpp1: number;
    station_kpp2: number;
    dist_kpp1_to_kpp2: number;
    dist_kpp2_to_kpp1: number;
    time_kpp1_to_kpp2: number;
    time_kpp2_to_kpp1: number;
    dist_kpp1_from_garage: number;
    dist_kpp2_from_garage: number;
    time_to_kpp1_f_gar: number;
    time_to_kpp2_f_gar: number;
    wait_time_kpp1: number;
    wait_time_kpp2: number;
    start_time_rush_hour_morning: number;
    start_time_rush_hour_dinner: number;
    end_time_rush_hour_morning: number;
    end_time_rush_hour_dinner: number;
    remark?: string;
}
