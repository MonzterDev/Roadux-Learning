-- Compiled with roblox-ts v2.1.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local ReplicatedStorage = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").ReplicatedStorage
local PET_ACTION = { "Equip", "Unequip", "Delete", "Lock", "Unlock" }
local PET_ACTION_BUTTONS = { "Unequip All", "Mass Delete", "Trash Mode", "Equip Best" }
local PETS = { "Dog", "Cat", "Turtle" }
local DEFAULT_MAX_PET_STORAGE_AMOUNT = 50
local DEFAULT_MAX_PET_EQUIPPED_AMOUNT = 5
local RARITIES = { "Common", "Uncommon", "Rare" }
local RARITY_COLORS = {
	Common = Color3.fromRGB(191, 191, 191),
	Uncommon = Color3.fromRGB(28, 179, 23),
	Rare = Color3.fromRGB(51, 222, 227),
}
local function GetPetModel(pet)
	local petModels = ReplicatedStorage.Pets
	return petModels:FindFirstChild(pet)
end
local function getMaxPetsEquipped(data)
	local total = DEFAULT_MAX_PET_EQUIPPED_AMOUNT
	-- if (data.gamepasses.get("Equip 2 More Pets")) total += 2;
	-- if (data.gamepasses.get("Equip 5 More Pets")) total += 5;
	return total
end
local function getMaxPetsStored(data)
	local total = DEFAULT_MAX_PET_STORAGE_AMOUNT
	-- if (data.gamepasses.get("100 Pet Storage")) total += 100;
	-- if (data.gamepasses.get("500 Pet Storage")) total += 500;
	return total
end
local function getEquippedPets(data)
	local equipped = {}
	for uuid, instance in pairs(data.petInventory) do
		if data.petInventory[uuid].equipped then
			table.insert(equipped, instance)
		end
	end
	return equipped
end
return {
	GetPetModel = GetPetModel,
	getMaxPetsEquipped = getMaxPetsEquipped,
	getMaxPetsStored = getMaxPetsStored,
	getEquippedPets = getEquippedPets,
	PET_ACTION = PET_ACTION,
	PET_ACTION_BUTTONS = PET_ACTION_BUTTONS,
	PETS = PETS,
	DEFAULT_MAX_PET_STORAGE_AMOUNT = DEFAULT_MAX_PET_STORAGE_AMOUNT,
	DEFAULT_MAX_PET_EQUIPPED_AMOUNT = DEFAULT_MAX_PET_EQUIPPED_AMOUNT,
	RARITIES = RARITIES,
	RARITY_COLORS = RARITY_COLORS,
}
