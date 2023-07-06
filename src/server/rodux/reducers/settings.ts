import { Action, createReducer } from "@rbxts/rodux";
import { GivePetAction, RenamePetAction, UpdatePetAction, UpdateSettingAction } from "shared/types/Rodux";
import { WithDefaultAction } from "../reducers";
import { Setting } from "shared/constants/Settings";

export function updateSetting(state: SettingState, action: WithDefaultAction<UpdateSettingAction>): SettingState {
	state[action.meta.playerId][action.setting] = action.value;
	return state;
}

export type SettingActions = WithDefaultAction<UpdateSettingAction>;

export type SettingState = Record<string, Record<Setting, boolean>>;

export const settingsReducer = createReducer<SettingState, SettingActions>(
	{},
	{
		updateSetting: updateSetting,
	},
);
export type PlayerState = ReturnType<typeof settingsReducer>;
