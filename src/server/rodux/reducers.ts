import { Action, createReducer } from "@rbxts/rodux";
import { PlayerData } from "shared/types/PlayerData";
import {
	AddPlayerAction,
	GivePetAction,
	PlayerDataKeys,
	RenamePetAction,
	UpdateCurrencyAction,
	UpdatePetAction,
	UpdateSettingAction,
} from "shared/types/Rodux";
import { Pet, PetInstance, Rarity } from "shared/constants/Pets";

export interface DefaultAction {
	meta: {
		playerId: number;
		replicateTo?: number[];
		broadcast?: boolean;
	};
}

type WithDefaultAction<T extends Action<any>> = T & DefaultAction;

export function addPlayer(state: DataState, action: WithDefaultAction<AddPlayerAction>): DataState {
	state[action.meta.playerId] = action.data;
	return state;
}

export interface RemovePlayerAction extends DefaultAction, Action<PlayerDataKeys.removePlayer> {}

export function removePlayer(state: DataState, action: RemovePlayerAction): DataState {
	state[action.meta.playerId] = undefined as never as PlayerData;
	return state;
}

export function updateCurrency(state: DataState, action: WithDefaultAction<UpdateCurrencyAction>): DataState {
	state[action.meta.playerId][action.currency] = action.amount;
	return state;
}

export function updateSetting(state: DataState, action: WithDefaultAction<UpdateSettingAction>): DataState {
	state[action.meta.playerId].settings[action.setting] = action.value;
	return state;
}

export function givePet(state: DataState, action: WithDefaultAction<GivePetAction>): DataState {
	state[action.meta.playerId].petInventory[action.pet.uuid] = action.pet;
	return state;
}

export function updatePet(state: DataState, action: WithDefaultAction<UpdatePetAction>): DataState {
	const pet = state[action.meta.playerId].petInventory[action.uuid];
	if (!pet) return state;

	if (action.equipped !== undefined) pet.equipped = action.equipped;
	if (action.locked !== undefined) pet.locked = action.locked;

	if (action.delete) {
		state[action.uuid].petInventory[action.uuid] = undefined as never as PetInstance;
	}

	return state;
}

export function renamePet(state: DataState, action: WithDefaultAction<RenamePetAction>): DataState {
	const pet = state[action.meta.playerId].petInventory[action.uuid];
	if (!pet) return state;

	state[action.meta.playerId].petInventory[action.uuid].name = action.name;

	return state;
}

export type DataState = Record<string, PlayerData>;
export type DataActions =
	| WithDefaultAction<AddPlayerAction>
	| RemovePlayerAction
	| WithDefaultAction<UpdateCurrencyAction>
	| WithDefaultAction<UpdateSettingAction>
	| WithDefaultAction<UpdatePetAction>
	| WithDefaultAction<GivePetAction>
	| WithDefaultAction<RenamePetAction>;

export const dataReducer = createReducer<DataState, DataActions>(
	{},
	{
		addPlayer: addPlayer,
		removePlayer: removePlayer,
		updateCurrency,
		updateSetting,
		updatePet,
		givePet,
		renamePet,
	},
);
export type PlayerState = ReturnType<typeof dataReducer>;
