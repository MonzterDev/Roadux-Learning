import { Action, createReducer } from "@rbxts/rodux";
import { AddPlayerAction, GivePetAction, RenamePetAction, UpdatePetAction } from "shared/types/Rodux";
import { PetInstance } from "shared/constants/Pets";
import { RemovePlayerAction, WithDefaultAction, removePlayer } from ".";
import Object from "@rbxts/object-utils";

export function givePet(state: PetInventoryState, action: WithDefaultAction<GivePetAction>): PetInventoryState {
	const newState = Object.deepCopy(state);
	newState[action.meta.playerId][action.pet.uuid] = action.pet;
	return newState;
}

export function updatePet(state: PetInventoryState, action: WithDefaultAction<UpdatePetAction>): PetInventoryState {
	const newState = Object.deepCopy(state);
	const pet = newState[action.meta.playerId][action.uuid];
	if (!pet) return newState;

	if (action.equipped !== undefined) pet.equipped = action.equipped;
	if (action.locked !== undefined) pet.locked = action.locked;

	if (action.delete) {
		newState[action.meta.playerId][action.uuid] = undefined as never as PetInstance;
	}

	return newState;
}

export function renamePet(state: PetInventoryState, action: WithDefaultAction<RenamePetAction>): PetInventoryState {
	const newState = Object.deepCopy(state);
	const pet = newState[action.meta.playerId][action.uuid];
	if (!pet) return newState;

	newState[action.meta.playerId][action.uuid].name = action.name;

	return newState;
}

export function addPlayer(state: PetInventoryState, action: WithDefaultAction<AddPlayerAction>): PetInventoryState {
	const newState = Object.deepCopy(state);
	newState[action.meta.playerId] = {} as never;
	newState[action.meta.playerId] = action.data.petInventory;
	return newState;
}

export type PetActions =
	| WithDefaultAction<AddPlayerAction>
	| WithDefaultAction<RemovePlayerAction>
	| WithDefaultAction<GivePetAction>
	| WithDefaultAction<RenamePetAction>
	| WithDefaultAction<UpdatePetAction>;

export type PetInventoryState = Record<number, Record<string, PetInstance>>;

export const petsDataReducer = createReducer<PetInventoryState, PetActions>(
	{},
	{
		addPlayer: addPlayer,
		removePlayer: removePlayer,
		givePet: givePet,
		renamePet: renamePet,
		updatePet: updatePet,
	},
);
