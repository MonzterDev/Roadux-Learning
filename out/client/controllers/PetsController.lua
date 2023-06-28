-- Compiled with roblox-ts v2.1.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Reflect = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@flamework", "core", "out").Reflect
local Controller = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@flamework", "core", "out").Controller
local _roact = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "roact", "src")
local Roact = _roact
local createElement = _roact.createElement
local mount = _roact.mount
local withHookDetection = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "roact-hooked", "src").withHookDetection
local RoactRodux = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "roact-rodux", "src")
local Players = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").Players
local clientStore = TS.import(script, script.Parent.Parent, "rodux", "rodux").clientStore
local PetInventoryApp = TS.import(script, script.Parent.Parent, "ui", "apps", "PetInventory").PetInventoryApp
local PetsController
do
	PetsController = setmetatable({}, {
		__tostring = function()
			return "PetsController"
		end,
	})
	PetsController.__index = PetsController
	function PetsController.new(...)
		local self = setmetatable({}, PetsController)
		return self:constructor(...) or self
	end
	function PetsController:constructor()
		self.player = Players.LocalPlayer
		self.playerGui = self.player:WaitForChild("PlayerGui", 5)
	end
	function PetsController:onStart()
		withHookDetection(Roact)
		mount(createElement(RoactRodux.StoreProvider, {
			store = clientStore,
		}, { createElement(PetInventoryApp) }), self.playerGui)
	end
	function PetsController:performPetAction(action)
		repeat
			if action == "Equip Best" then
				break
			end
			if action == "Mass Delete" then
				break
			end
			if action == "Trash Mode" then
				break
			end
			if action == "Unequip All" then
				self:unequipAll()
				break
			end
			break
		until true
	end
	function PetsController:unequipAll()
	end
	function PetsController:unequipPet(uuid)
	end
end
-- (Flamework) PetsController metadata
Reflect.defineMetadata(PetsController, "identifier", "client/controllers/PetsController@PetsController")
Reflect.defineMetadata(PetsController, "flamework:implements", { "$:flamework@OnStart" })
Reflect.decorate(PetsController, "$:flamework@Controller", Controller, { {} })
return {
	PetsController = PetsController,
}
