import { create } from "zustand"

import { basePermissions } from "./constants"
import { IInitialState, IPermissionStore } from "./types"

const initialState: IInitialState = {
	permissions: basePermissions,
}

export const usePermissionStore = create<IPermissionStore>()((set, get) => ({
	...initialState,
	changePermission: ({ name, value }) => {
		get().permissions[name] = value
		set({ permissions: get().permissions })
	},
	setPermissions: (permissions) => {
		set({ permissions })
	},
	clearPermissions: () => {
		set({ permissions: basePermissions })
	},
}))
