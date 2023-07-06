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
import Object from "@rbxts/object-utils";

export function addPlayer(state: DataState, action: AddPlayerAction): DataState {
	return action.data;
}

export function updateCurrency(state: DataState, action: UpdateCurrencyAction): DataState {
	const newState = Object.deepCopy(state);
	newState.currency[action.currency as keyof typeof state.currency] = action.amount;
	return newState;
}

export function updateSetting(state: DataState, action: UpdateSettingAction): DataState {
	const newState = Object.deepCopy(state);
	newState.settings[action.setting] = action.value;
	return newState;
}

export function givePet(state: DataState, action: GivePetAction): DataState {
	const newState = Object.deepCopy(state);
	const petInstance = action.pet;
	newState.petInventory[petInstance.uuid] = petInstance;
	return newState;
}

export function updatePet(state: DataState, action: UpdatePetAction): DataState {
	const newState = Object.deepCopy(state);
	const pet = newState.petInventory[action.uuid];
	if (!pet) return newState;

	if (action.equipped !== undefined) pet.equipped = action.equipped;
	if (action.locked !== undefined) pet.locked = action.locked;

	if (action.delete) {
		newState.petInventory[action.uuid] = undefined as never as PetInstance;
	}

	return newState;
}

export function renamePet(state: DataState, action: RenamePetAction): DataState {
	const newState = Object.deepCopy(state);
	const pet = newState.petInventory[action.uuid];
	if (!pet) return newState;

	newState.petInventory[action.uuid].name = action.name;

	return newState;
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
