-- Compiled with roblox-ts v2.1.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _core = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@flamework", "core", "out")
local Reflect = _core.Reflect
local Flamework = _core.Flamework
local Service = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@flamework", "core", "out").Service
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local HttpService = _services.HttpService
local Players = _services.Players
local Events = TS.import(script, game:GetService("ServerScriptService"), "TS", "network").Events
local PetsService
do
	PetsService = setmetatable({}, {
		__tostring = function()
			return "PetsService"
		end,
	})
	PetsService.__index = PetsService
	function PetsService.new(...)
		local self = setmetatable({}, PetsService)
		return self:constructor(...) or self
	end
	function PetsService:constructor()
		self.playerDataService = Flamework.resolveDependency("server/services/PlayerDataService@PlayerDataService")
	end
	function PetsService:onStart()
		Events.equipPet:connect(function(player, uuid)
			return self:equipPet(player, uuid)
		end)
		Events.unequipPet:connect(function(player, uuid)
			return self:unequipPet(player, uuid)
		end)
		task.delay(5, function()
			print("giving pet")
			local _exp = Players:GetPlayers()
			local _arg0 = function(player)
				return self:givePet(player)
			end
			for _k, _v in _exp do
				_arg0(_v, _k - 1, _exp)
			end
		end)
	end
	function PetsService:givePet(player)
		local pet = {
			uuid = HttpService:GenerateGUID(false),
			type = "Dog",
			rarity = "Common",
			equipped = false,
			locked = false,
		}
		local profile = self.playerDataService:getProfile(player)
		if not profile then
			return nil
		end
		profile.data.petInventory[pet.uuid] = pet
		Events.givePet(player, pet)
	end
	function PetsService:equipPet(player, uuid)
		print("Update")
		local profile = self.playerDataService:getProfile(player)
		if not profile then
			return nil
		end
		print(uuid)
		local pet = profile.data.petInventory[uuid]
		if not pet then
			return nil
		end
		print("Update")
		pet.equipped = true
		Events.equipPet(player, uuid)
	end
	function PetsService:unequipPet(player, uuid)
		local profile = self.playerDataService:getProfile(player)
		if not profile then
			return nil
		end
		local pet = profile.data.petInventory[uuid]
		if not pet then
			return nil
		end
		pet.equipped = false
		Events.unequipPet(player, uuid)
	end
end
-- (Flamework) PetsService metadata
Reflect.defineMetadata(PetsService, "identifier", "server/services/PetsService@PetsService")
Reflect.defineMetadata(PetsService, "flamework:implements", { "$:flamework@OnStart" })
Reflect.decorate(PetsService, "$:flamework@Service", Service, { {} })
return {
	PetsService = PetsService,
}
