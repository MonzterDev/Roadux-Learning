import { ReplicatedStorage } from "@rbxts/services";
import { PlayerData } from "shared/types/PlayerData";

export const PET_ACTION = ["Equip", "Unequip", "Delete", "Lock", "Unlock"] as const;
export type PetAction = typeof PET_ACTION[number];

export const PET_ACTION_BUTTONS = ["Unequip All", "Mass Delete", "Trash Mode", "Equip Best"] as const;
export type PetActionButton = typeof PET_ACTION_BUTTONS[number];

export const PETS = ["Dog", "Cat", "Turtle"] as const;
export type Pet = typeof PETS[number];

export const DEFAULT_MAX_PET_STORAGE_AMOUNT = 50;
export const DEFAULT_MAX_PET_EQUIPPED_AMOUNT = 5;

export interface PetInstance {
	uuid: string;
	type: Pet;
	rarity: Rarity;
	locked?: boolean;
	equipped?: boolean;
}

export type PetInventory = Record<string, PetInstance>;

export const RARITIES = ["Common", "Uncommon", "Rare"] as const;
export type Rarity = typeof RARITIES[number];

export const RARITY_COLORS: Record<Rarity, Color3> = {
	Common: Color3.fromRGB(191, 191, 191),
	Uncommon: Color3.fromRGB(28, 179, 23),
	Rare: Color3.fromRGB(51, 222, 227),
};

export function GetPetModel(pet: Pet) {
	const petModels = ReplicatedStorage.Pets;
	return petModels.FindFirstChild(pet) as Model;
}

export function getMaxPetsEquipped(data: PlayerData) {
	const total = DEFAULT_MAX_PET_EQUIPPED_AMOUNT;
	// if (data.gamepasses.get("Equip 2 More Pets")) total += 2;
	// if (data.gamepasses.get("Equip 5 More Pets")) total += 5;
	return total;
}

export function getMaxPetsStored(data: PlayerData) {
	const total = DEFAULT_MAX_PET_STORAGE_AMOUNT;
	// if (data.gamepasses.get("100 Pet Storage")) total += 100;
	// if (data.gamepasses.get("500 Pet Storage")) total += 500;
	return total;
}

export function getEquippedPets(data: PlayerData) {
	const equipped: PetInstance[] = [];
	for (const [uuid, instance] of pairs(data.petInventory)) {
		if (data.petInventory[uuid].equipped) equipped.push(instance);
	}
	return equipped;
}
