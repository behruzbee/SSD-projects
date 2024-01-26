interface IBulGarages {
    name: string | number;
    bus_id: number;
}

interface IBulRoutes {
    name: string;
    route_id: number;
    garage_list: IBulGarages[];
}

export interface IBulGarage {
    name: string;
    park_id: number;
    route_list: IBulRoutes[];
}

export interface IBulKppData {
    enter_diff: string;
    enter_fact: string;
    enter_plan: string;
    exit_diff: string;
    exit_fact: string;
    exit_plan: string;
}

export interface IBulDriverInfo {
    garage: string;
    graphic: number;
    name: string;
    pnfl: string;
    route_name: string;
    tabel: string;
}

export interface IBulrace {
    kpp1_name: string;
    kpp2_name: string;
    nv_time: number;
    reys_count: number;
    reys_plan: number;
    reys_regular: number;
    reys_with_fine: number;
    work_begin_fact: number;
    work_begin_plan: number;
    work_end_fact: number;
    work_end_plan: number;
}
