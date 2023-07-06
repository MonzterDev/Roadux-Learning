import { Action, createReducer } from "@rbxts/rodux";
import { PlayerData } from "shared/types/PlayerData";
import { GivePetAction, RenamePetAction, UpdatePetAction } from "shared/types/Rodux";
import { Pet, PetInstance, Rarity } from "shared/constants/Pets";
import { WithDefaultAction } from "../reducers";

export function givePet(state: PetInventoryState, action: WithDefaultAction<GivePetAction>): PetInventoryState {
	state[action.meta.playerId][action.pet.uuid] = action.pet;
	return state;
}

export function updatePet(state: PetInventoryState, action: WithDefaultAction<UpdatePetAction>): PetInventoryState {
	const pet = state[action.meta.playerId][action.uuid];
	if (!pet) return state;

	if (action.equipped !== undefined) pet.equipped = action.equipped;
	if (action.locked !== undefined) pet.locked = action.locked;

	if (action.delete) {
		state[action.uuid][action.uuid] = undefined as never as PetInstance;
	}

	return state;
}

export function renamePet(state: PetInventoryState, action: WithDefaultAction<RenamePetAction>): PetInventoryState {
	const pet = state[action.meta.playerId][action.uuid];
	if (!pet) return state;

	state[action.meta.playerId][action.uuid].name = action.name;

	return state;
}

export function playerJoinedPets(
	state: PetInventoryState,
	action: WithDefaultAction<RenamePetAction>,
): PetInventoryState {
	const pet = state[action.meta.playerId][action.uuid];
	if (!pet) return state;

	state[action.meta.playerId][action.uuid].name = action.name;

	return state;
}

export type PetActions =
	| WithDefaultAction<GivePetAction>
	| WithDefaultAction<RenamePetAction>
	| WithDefaultAction<UpdatePetAction>;

export type PetInventoryState = Record<string, Record<string, PetInstance>>;

export const petsDataReducer = createReducer<PetInventoryState, PetActions>(
	{},
	{
		updatePet: updatePet,
		givePet: givePet,
		renamePet: renamePet,
	},
);
export type PlayerState = ReturnType<typeof petsDataReducer>;
