import { Event } from "@rbxts/roact";
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
	name: string;
	rarity: Rarity;
	locked?: boolean;
	equipped?: boolean;
}

type PetClickRarity = Record<Rarity, number>;

const DEFAULT_PET_RARITY_PROPS: PetClickRarity = {
	Common: 10,
	Uncommon: 20,
	Rare: 50,
};

interface PetProps {
	clicks: PetClickRarity;
}

export const PET_CONFIG: Record<Pet, PetProps> = {
	Dog: {
		clicks: DEFAULT_PET_RARITY_PROPS,
	},
	Cat: {
		clicks: DEFAULT_PET_RARITY_PROPS,
	},
	Turtle: {
		clicks: {
			Common: 15,
			Uncommon: 30,
			Rare: 75,
		},
	},
};

export type PetInventory = Record<string, PetInstance>;

export const RARITIES = ["Common", "Uncommon", "Rare"] as const;
export type Rarity = typeof RARITIES[number];

export const RARITY_COLORS: Record<Rarity, Color3> = {
	Common: Color3.fromRGB(191, 191, 191),
	Uncommon: Color3.fromRGB(28, 179, 23),
	Rare: Color3.fromRGB(51, 222, 227),
};

export function createPetInstance(petInstance: Partial<PetInstance>): PetInstance {
	return {
		uuid: petInstance.uuid ?? "", // Provide default values if needed
		type: petInstance.type ?? "Dog",
		name: petInstance.name ?? "Dog",
		rarity: petInstance.rarity ?? "Common",
		locked: petInstance.locked === undefined ? false : petInstance.locked,
		equipped: petInstance.equipped === undefined ? false : petInstance.equipped,
	};
}

export function GetPetModel(pet: Pet) {
	const petModels = ReplicatedStorage.Pets;
	return petModels.FindFirstChild(pet) as Model;
}

export function getPetClicks(pet: PetInstance) {
	let amount = 0;

	const petConfig = PET_CONFIG[pet.type];
	const rarityClicks = petConfig.clicks[pet.rarity];
	if (rarityClicks) amount += rarityClicks;

	return amount;
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

export function getBestPets(data: PlayerData) {
	const allPets: { uuid: string; power: number }[] = [];

	for (const [uuid, instance] of pairs(data.petInventory)) {
		const power = getPetClicks(instance);
		allPets.push({ uuid: uuid, power: power });
	}

	allPets.sort((a, b) => {
		return a.power > b.power;
	});

	const maxEquipped = allPets.size() > getMaxPetsEquipped(data) ? getMaxPetsEquipped(data) : allPets.size();
	const topPets: string[] = [];
	for (let x = 0; x < maxEquipped; x++) topPets.insert(x, allPets[x].uuid);

	return topPets;
}
