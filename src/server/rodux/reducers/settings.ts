import { Action, createReducer } from "@rbxts/rodux";
import { AddPlayerAction, UpdateSettingAction } from "shared/types/Rodux";
import { Setting } from "shared/constants/Settings";
import { RemovePlayerAction, WithDefaultAction, removePlayer } from ".";
import Object from "@rbxts/object-utils";

export function updateSetting(state: SettingState, action: WithDefaultAction<UpdateSettingAction>): SettingState {
	const newState = Object.deepCopy(state);
	newState[action.meta.playerId][action.setting] = action.value;
	return newState;
}

export function addPlayer(state: SettingState, action: WithDefaultAction<AddPlayerAction>): SettingState {
	const newState = Object.deepCopy(state);
	newState[action.meta.playerId] = {} as never;
	newState[action.meta.playerId] = action.data.settings;
	return newState;
}

export type SettingActions =
	| WithDefaultAction<UpdateSettingAction>
	| WithDefaultAction<AddPlayerAction>
	| WithDefaultAction<RemovePlayerAction>;

export type SettingState = Record<number, Record<Setting, boolean>>;

export const settingsReducer = createReducer<SettingState, SettingActions>(
	{},
	{
		updateSetting: updateSetting,
		addPlayer: addPlayer,
		removePlayer: removePlayer,
	},
);
