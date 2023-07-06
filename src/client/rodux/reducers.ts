import { Action, createReducer } from "@rbxts/rodux";
import { PlayerData } from "shared/types/PlayerData";
import { DEFAULT_PLAYER_DATA } from "shared/constants/PlayerData";
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

export function addPlayer(state: DataState, action: AddPlayerAction): DataState {
	return action.data;
}

export function updateCurrency(state: DataState, action: UpdateCurrencyAction): DataState {
	state.currency[action.currency as keyof typeof state.currency] = action.amount;
	return state;
}

export function updateSetting(state: DataState, action: UpdateSettingAction): DataState {
	state.settings[action.setting] = action.value;
	return state;
}

export function givePet(state: DataState, action: GivePetAction): DataState {
	const petInstance = action.pet;
	state.petInventory[petInstance.uuid] = petInstance;
	return state;
}

export function updatePet(state: DataState, action: UpdatePetAction): DataState {
	const pet = state.petInventory[action.uuid];
	if (!pet) return state;

	if (action.equipped !== undefined) pet.equipped = action.equipped;
	if (action.locked !== undefined) pet.locked = action.locked;

	if (action.delete) {
		state.petInventory[action.uuid] = undefined as never as PetInstance;
	}

	return state;
}

export function renamePet(state: DataState, action: RenamePetAction): DataState {
	const pet = state.petInventory[action.uuid];
	if (!pet) return state;

	state.petInventory[action.uuid].name = action.name;

	return state;
}

export type DataState = PlayerData;
export type DataActions =
	| AddPlayerAction
	| UpdateCurrencyAction
	| UpdateSettingAction
	| UpdatePetAction
	| GivePetAction
	| RenamePetAction;

export const dataReducer = createReducer<DataState, DataActions>(DEFAULT_PLAYER_DATA, {
	addPlayer,
	updateCurrency,
	updateSetting,
	updatePet,
	givePet,
	renamePet,
});
export type PlayerState = ReturnType<typeof dataReducer>;
