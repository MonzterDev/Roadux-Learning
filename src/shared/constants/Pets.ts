import { ReplicatedStorage } from "@rbxts/services";

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
