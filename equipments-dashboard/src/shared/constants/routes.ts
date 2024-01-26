// Main pages
export enum AppPages {
	RootPage = "/",
	LoginPage = "/login",
	MonitoringPage = "/monitoring",
	ReportsPage = "/reports",
	StatisticsPage = "/statistics",
	ManagePage = "/manage",
	NotFoundPage = "/404",
	AnyPage = "*",
}

// Statistics pages

export enum StatisticsPages {
	DistancePage = `${AppPages.StatisticsPage}/distance`,
	FuelPage = `${AppPages.StatisticsPage}/fuel`,
	TimePage = `${AppPages.StatisticsPage}/time`,
	ViolationPage = `${AppPages.StatisticsPage}/violation`,
	LatenessPage = `${AppPages.StatisticsPage}/lateness`,
}

// Manage pages

export enum ManagePages {
	OrganizationsPage = `${AppPages.ManagePage}/organizations`,
	GaragesPage = `${AppPages.ManagePage}/garages`,
	TrackersPage = `${AppPages.ManagePage}/trackers`,
	TrackerTypesPage = `${AppPages.ManagePage}/tracker-types`,
	AutotransportsPage = `${AppPages.ManagePage}/autotransports`,
	AutotransportTypesPage = `${AppPages.ManagePage}/autotransport-types`,
	DevicesPage = `${AppPages.ManagePage}/devices`,
	DeviceTypesPage = `${AppPages.ManagePage}/device-types`,
	RoutesPage = `${AppPages.ManagePage}/routes`,
	GeozonesPage = `${AppPages.ManagePage}/geozones`,
	ControlPointsPage = `${AppPages.ManagePage}/control-points`,
	UsersPage = `${AppPages.ManagePage}/users`,
	TasksPage = `${AppPages.ManagePage}/tasks`,
	RolesPage = `${AppPages.ManagePage}/roles`,
	SettingsPage = `${AppPages.ManagePage}/settings`,
}

export enum OrganizationsPages {
	Root = ManagePages.OrganizationsPage,
	Create = `${ManagePages.OrganizationsPage}/create`,
	Edit = `${ManagePages.OrganizationsPage}/edit`,
}

export enum AutotransportsPages {
	Root = ManagePages.AutotransportsPage,
	Create = `${ManagePages.AutotransportsPage}/create`,
	Edit = `${ManagePages.AutotransportsPage}/edit`,
}

export enum GaragePages {
	Root = ManagePages.GaragesPage,
}

export enum TrackerPages {
	Root = `${ManagePages.TrackersPage}`,
	Create = `${ManagePages.TrackersPage}/create`,
	Edit = `${ManagePages.TrackersPage}/edit`,
}

export enum TrackerTypesPages {
	Root = `${ManagePages.TrackerTypesPage}`,
	Create = `${ManagePages.TrackerTypesPage}/create`,
	Edit = `${ManagePages.TrackerTypesPage}/edit`,
}

export enum DevicesPages {
	Root = `${ManagePages.DevicesPage}`,
	Create = `${ManagePages.DevicesPage}/create`,
	Edit = `${ManagePages.DevicesPage}/edit`,
}

export enum DeviceTypesPages {
	Root = `${ManagePages.DeviceTypesPage}`,
	Create = `${ManagePages.DeviceTypesPage}/create`,
	Edit = `${ManagePages.DeviceTypesPage}/edit`,
}

export enum RoutePages {
	Root = `${ManagePages.RoutesPage}`,
	Create = `${ManagePages.RoutesPage}/create`,
	Edit = `${ManagePages.RoutesPage}/edit`,
}

export enum GeozonePages {
	Root = `${ManagePages.GeozonesPage}`,
	Create = `${ManagePages.GeozonesPage}/create`,
	Edit = `${ManagePages.GeozonesPage}/edit`,
}

export enum ControlPointPages {
	Root = `${ManagePages.ControlPointsPage}`,
	Create = `${ManagePages.ControlPointsPage}/create`,
	Edit = `${ManagePages.ControlPointsPage}/edit`,
}

export enum UserPages {
	Root = `${ManagePages.UsersPage}`,
	Create = `${ManagePages.UsersPage}/create`,
	Edit = `${ManagePages.UsersPage}/edit`,
}

export enum TaskPages {
	Root = `${ManagePages.TasksPage}`,
	Create = `${ManagePages.TasksPage}/create`,
	Edit = `${ManagePages.TasksPage}/edit`,
}

export enum RolePages {
	Root = `${ManagePages.RolesPage}`,
	Create = `${ManagePages.RolesPage}/create`,
	Edit = `${ManagePages.RolesPage}/edit`,
}

export enum SettingPages {
	Root = `${ManagePages.SettingsPage}`,
	Edit = `${ManagePages.SettingsPage}/edit`,
}
