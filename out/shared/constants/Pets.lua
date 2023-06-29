-- Compiled with roblox-ts v2.1.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local ReplicatedStorage = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").ReplicatedStorage
local PET_ACTION = { "Equip", "Unequip", "Delete", "Lock", "Unlock" }
local PET_ACTION_BUTTONS = { "Unequip All", "Mass Delete", "Trash Mode", "Equip Best" }
local PETS = { "Dog", "Cat", "Turtle" }
local DEFAULT_MAX_PET_STORAGE_AMOUNT = 50
local DEFAULT_MAX_PET_EQUIPPED_AMOUNT = 5
local DEFAULT_PET_RARITY_PROPS = {
	Common = 10,
	Uncommon = 20,
	Rare = 50,
}
local PET_CONFIG = {
	Dog = {
		clicks = DEFAULT_PET_RARITY_PROPS,
	},
	Cat = {
		clicks = DEFAULT_PET_RARITY_PROPS,
	},
	Turtle = {
		clicks = {
			Common = 15,
			Uncommon = 30,
			Rare = 75,
		},
	},
}
local RARITIES = { "Common", "Uncommon", "Rare" }
local RARITY_COLORS = {
	Common = Color3.fromRGB(191, 191, 191),
	Uncommon = Color3.fromRGB(28, 179, 23),
	Rare = Color3.fromRGB(51, 222, 227),
}
local function createPetInstance(petInstance)
	local _object = {}
	local _left = "uuid"
	local _condition = petInstance.uuid
	if _condition == nil then
		_condition = ""
	end
	_object[_left] = _condition
	_object.type = petInstance.type or "Dog"
	local _left_1 = "name"
	local _condition_1 = petInstance.name
	if _condition_1 == nil then
		_condition_1 = "Dog"
	end
	_object[_left_1] = _condition_1
	_object.rarity = petInstance.rarity or "Common"
	_object.locked = if petInstance.locked == nil then false else petInstance.locked
	_object.equipped = if petInstance.equipped == nil then false else petInstance.equipped
	return _object
end
local function GetPetModel(pet)
	local petModels = ReplicatedStorage.Pets
	return petModels:FindFirstChild(pet)
end
local function getPetClicks(pet)
	local amount = 0
	local petConfig = PET_CONFIG[pet.type]
	local rarityClicks = petConfig.clicks[pet.rarity]
	if rarityClicks ~= 0 and (rarityClicks == rarityClicks and rarityClicks) then
		amount += rarityClicks
	end
	return amount
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
local function getBestPets(data)
	local allPets = {}
	for uuid, instance in pairs(data.petInventory) do
		local power = getPetClicks(instance)
		local _arg0 = {
			uuid = uuid,
			power = power,
		}
		table.insert(allPets, _arg0)
	end
	local _arg0 = function(a, b)
		return a.power > b.power
	end
	table.sort(allPets, _arg0)
	local maxEquipped = getMaxPetsEquipped(data)
	local topPets = {}
	do
		local x = 0
		local _shouldIncrement = false
		while true do
			if _shouldIncrement then
				x += 1
			else
				_shouldIncrement = true
			end
			if not (x < maxEquipped) then
				break
			end
			local _x = x
			local _uuid = allPets[x + 1].uuid
			table.insert(topPets, _x + 1, _uuid)
		end
	end
	return topPets
end
return {
	createPetInstance = createPetInstance,
	GetPetModel = GetPetModel,
	getPetClicks = getPetClicks,
	getMaxPetsEquipped = getMaxPetsEquipped,
	getMaxPetsStored = getMaxPetsStored,
	getEquippedPets = getEquippedPets,
	getBestPets = getBestPets,
	PET_ACTION = PET_ACTION,
	PET_ACTION_BUTTONS = PET_ACTION_BUTTONS,
	PETS = PETS,
	DEFAULT_MAX_PET_STORAGE_AMOUNT = DEFAULT_MAX_PET_STORAGE_AMOUNT,
	DEFAULT_MAX_PET_EQUIPPED_AMOUNT = DEFAULT_MAX_PET_EQUIPPED_AMOUNT,
	PET_CONFIG = PET_CONFIG,
	RARITIES = RARITIES,
	RARITY_COLORS = RARITY_COLORS,
}
