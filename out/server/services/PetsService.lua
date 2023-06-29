-- Compiled with roblox-ts v2.1.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _core = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@flamework", "core", "out")
local Reflect = _core.Reflect
local Flamework = _core.Flamework
local Service = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@flamework", "core", "out").Service
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local HttpService = _services.HttpService
local Players = _services.Players
local TextService = _services.TextService
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
		Events.petAction:connect(function(player, uuid, action)
			print("pet action", player, uuid, action)
			repeat
				if action == "Equip" then
					self:equipPet(player, uuid)
					break
				end
				if action == "Unequip" then
					self:unequipPet(player, uuid)
					break
				end
				if action == "Lock" then
					self:lockPet(player, uuid)
					break
				end
				if action == "Unlock" then
					self:unlockPet(player, uuid)
					break
				end
				if action == "Delete" then
					self:deletePet(player, uuid)
					break
				end
				break
			until true
		end)
		Events.renamePet:connect(function(player, uuid, name)
			return self:renamePet(player, uuid, name)
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
			name = "Dog",
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
		local profile = self.playerDataService:getProfile(player)
		if not profile then
			return nil
		end
		local pet = profile.data.petInventory[uuid]
		if not pet then
			return nil
		end
		pet.equipped = true
		Events.petAction(player, uuid, "Equip")
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
		Events.petAction(player, uuid, "Unequip")
	end
	function PetsService:deletePet(player, uuid)
		print("Delete")
		local profile = self.playerDataService:getProfile(player)
		if not profile then
			return nil
		end
		local pet = profile.data.petInventory[uuid]
		if not pet then
			return nil
		end
		profile.data.petInventory[uuid] = nil
		Events.petAction(player, uuid, "Delete")
	end
	function PetsService:lockPet(player, uuid)
		local profile = self.playerDataService:getProfile(player)
		if not profile then
			return nil
		end
		local pet = profile.data.petInventory[uuid]
		if not pet then
			return nil
		end
		pet.locked = true
		Events.petAction(player, uuid, "Lock")
	end
	function PetsService:unlockPet(player, uuid)
		local profile = self.playerDataService:getProfile(player)
		if not profile then
			return nil
		end
		local pet = profile.data.petInventory[uuid]
		if not pet then
			return nil
		end
		pet.locked = false
		Events.petAction(player, uuid, "Unlock")
	end
	function PetsService:renamePet(player, uuid, name)
		if #name > 1 and #name < 25 then
			return nil
		end
		local profile = self.playerDataService:getProfile(player)
		if not profile then
			return nil
		end
		local pet = profile.data.petInventory[uuid]
		if not pet then
			return nil
		end
		local filteredName = TextService:FilterStringAsync(name, player.UserId, Enum.TextFilterContext.PublicChat):GetNonChatStringForBroadcastAsync()
		pet.name = filteredName
		Events.renamePet(player, uuid, name)
	end
end
-- (Flamework) PetsService metadata
Reflect.defineMetadata(PetsService, "identifier", "server/services/PetsService@PetsService")
Reflect.defineMetadata(PetsService, "flamework:implements", { "$:flamework@OnStart" })
Reflect.decorate(PetsService, "$:flamework@Service", Service, { {} })
return {
	PetsService = PetsService,
}
