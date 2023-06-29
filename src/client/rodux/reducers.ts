import { Action, createReducer } from "@rbxts/rodux";
import { PlayerData } from "shared/types/PlayerData";
import { DEFAULT_PLAYER_DATA } from "shared/constants/PlayerData";
import { PlayerDataKeys } from "shared/types/Rodux";
import { Setting } from "shared/constants/Settings";
import { Pet, PetInstance, Rarity } from "shared/constants/Pets";

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

export function updateSetting(state: DataState, action: UpdateSettingAction): DataState {
	state.settings[action.setting] = action.value;
	return state;
}

export interface UpdatePetAction extends Action<PlayerDataKeys.updatePet> {
	uuid: string;
	equipped?: boolean;
	locked?: boolean;
	delete?: boolean;
}

export function updatePet(state: DataState, action: UpdatePetAction): DataState {
	const pet = state.petInventory[action.uuid];
	if (!pet) return state;

	if (action.equipped !== undefined) pet.equipped = action.equipped;
	if (action.locked !== undefined) pet.locked = action.locked;

	print(action);
	if (action.delete) {
		state.petInventory[action.uuid] = undefined as never as PetInstance;
		print("Deleted", state.petInventory);
	}

	return state;
}

export interface GivePetAction extends Action<PlayerDataKeys.givePet> {
	pet: Pet;
	rarity: Rarity;
	uuid: string;
}

export function givePet(state: DataState, action: GivePetAction): DataState {
	const petInstance: PetInstance = {
		uuid: action.uuid,
		type: action.pet,
		rarity: action.rarity,
		equipped: false,
		locked: false,
	};

	state.petInventory[action.uuid] = petInstance;

	return state;
}

export type DataState = PlayerData;
export type DataActions =
	| UpdateDataAction
	| UpdateCurrencyAction
	| UpdateSettingAction
	| UpdatePetAction
	| GivePetAction;

export const dataReducer = createReducer<DataState, DataActions>(DEFAULT_PLAYER_DATA, {
	init,
	updateCurrency,
	updateSetting,
	updatePet,
	givePet,
});
export type PlayerState = ReturnType<typeof dataReducer>;
