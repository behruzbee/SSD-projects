export enum apiKeys {
	login = "auth/login",
	me = "auth/me",
	// monitoring
	getMonitoringTransport = "monitoring/transport",
	// organization
	getOrganizations = "organization",
	getOrganization = "organization",
	createOrganization = "organization/create",
	deleteOrganization = "organization/delete",
	updateOrganization = "organization/update",
	// user
	getUsers = "user",
	getUser = "user",
	createUser = "user/create",
	updateUser = "user/update",
	deleteUser = "user/delete",
	// garage
	getGarages = "garage",
	getGarage = "garage",
	createGarage = "garage/create",
	deleteGarage = "garage/delete",
	// autotransport
	getAutotransports = "transport",
	getAutotransport = "transport",
	saveAutotransport = "transport/create",
	updateAutotransport = "transport/update",
	deleteAutotransport = "transport/delete",
	getAutotransportsByGarage = "transport/getByGarage",
	// autotransport-type
	getTransportTypes = "transport-type",
	createTransportType = "transport-type/create",
	deleteTransportType = "transport-type/delete",
	// device-type
	getDeviceTypes = "device-type",
	getDeviceType = "device-type",
	createDeviceType = "device-type/create",
	updateDeviceType = "device-type/update",
	deleteDeviceType = "device-type/delete",
	// device
	getDevices = "device",
	getDevice = "device",
	createDevice = "device/create",
	updateDevice = "device/update",
	deleteDevice = "device/delete",
	// tracker
	getTrackers = "tracker",
	getTracker = "tracker",
	createTracker = "tracker/create",
	updateTracker = "tracker/update",
	deleteTracker = "tracker/delete",
	searchTracker = "tracker/search",
	// tracker-type
	getTrackerTypes = "tracker-type",
	getTrackerType = "tracker-type",
	createTrackerType = "tracker-type/create",
	updateTrackerType = "tracker-type/update",
	deleteTrackerType = "tracker-type/delete",
	searchTrackerType = "tracker-type/search",
	// role
	getRoles = "role",
	getRole = "role",
	createRole = "role/create",
	updateRole = "role/update",
	deleteRole = "role/delete",
	// permissions
	getPermissions = "permission",
}
