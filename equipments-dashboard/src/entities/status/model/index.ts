import { create } from "zustand"

import { IInitialState, IStatusStore } from "./types"

const initialState: IInitialState = {}

export const useStatusStore = create<IStatusStore>()(() => ({
	...initialState,
}))
