import { Action, createReducer } from "@rbxts/rodux";
import { PlayerData } from "shared/types/PlayerData";
import { DEFAULT_PLAYER_DATA } from "shared/constants/PlayerData";
import { PlayerDataKeys } from "shared/types/Rodux";
import { Setting } from "shared/constants/Settings";

interface UpdateDataAction extends Action<PlayerDataKeys.init> {
	data: DataState;
}

// Define the `init` function
export function init(state: DataState, action: UpdateDataAction): DataState {
	return action.data;
}

interface UpdateCurrencyAction extends Action<PlayerDataKeys.updateCurrency> {
	amount: number;
	currency: ExtractKeys<PlayerData, number>;
}

// Define the `updateCurrency` function
export function updateCurrency(state: DataState, action: UpdateCurrencyAction): DataState {
	state[action.currency] = action.amount;
	return state;
}

export interface UpdateSettingAction extends Action<PlayerDataKeys.updateSetting> {
	setting: Setting;
	value: boolean;
}

// // Define the `updateSetting` function
// export function updateSetting(state: DataState, action: UpdateSettingAction): DataState {
// 	state.settings[action.setting] = action.value;
// 	return state;
// }

export function updateSetting(state: DataState, action: UpdateSettingAction): DataState {
	state.settings[action.setting] = action.value;
	return state;
}

export type DataState = PlayerData;
export type DataActions = UpdateDataAction | UpdateCurrencyAction | UpdateSettingAction;

export const dataReducer = createReducer<DataState, DataActions>(DEFAULT_PLAYER_DATA, {
	init,
	updateCurrency,
	updateSetting,
});
export type PlayerState = ReturnType<typeof dataReducer>;
