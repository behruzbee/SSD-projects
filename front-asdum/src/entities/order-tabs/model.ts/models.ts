export interface LinkTabProps {
    label?: string;
    href: string;
}

export interface StyledTabsProps {
    children?: React.ReactNode;
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export interface IOrderTab {
    data: Array<{path: string; title: string}>;
}
