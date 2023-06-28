-- Compiled with roblox-ts v2.1.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Reflect = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@flamework", "core", "out").Reflect
local Controller = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@flamework", "core", "out").Controller
local _roact = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "roact", "src")
local createElement = _roact.createElement
local mount = _roact.mount
local Roact = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "roact", "src")
local withHookDetection = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "roact-hooked", "src").withHookDetection
local RoactRodux = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "roact-rodux", "src")
local Players = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").Players
local clientStore = TS.import(script, script.Parent.Parent, "rodux", "rodux").clientStore
local SettingsApp = TS.import(script, script.Parent.Parent, "ui", "apps", "Settings").SettingsApp
local PlayerDataKeys = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "types", "Rodux").PlayerDataKeys
local SettingsController
do
	SettingsController = setmetatable({}, {
		__tostring = function()
			return "SettingsController"
		end,
	})
	SettingsController.__index = SettingsController
	function SettingsController.new(...)
		local self = setmetatable({}, SettingsController)
		return self:constructor(...) or self
	end
	function SettingsController:constructor()
		self.player = Players.LocalPlayer
		self.playerGui = self.player:WaitForChild("PlayerGui", 5)
	end
	function SettingsController:onStart()
		withHookDetection(Roact)
		mount(createElement(RoactRodux.StoreProvider, {
			store = clientStore,
		}, { createElement(SettingsApp) }), self.playerGui)
		clientStore.changed:connect(function(newState)
			return print(newState)
		end)
	end
	function SettingsController:updateSetting(setting, value)
		local currentValue = clientStore:getState().settings[setting]
		if currentValue == value then
			return nil
		end
		local action = {
			type = PlayerDataKeys.updateSetting,
			setting = setting,
			value = value,
		}
		clientStore:dispatch(action)
	end
end
-- (Flamework) SettingsController metadata
Reflect.defineMetadata(SettingsController, "identifier", "client/controllers/SettingsController@SettingsController")
Reflect.defineMetadata(SettingsController, "flamework:implements", { "$:flamework@OnStart" })
Reflect.decorate(SettingsController, "$:flamework@Controller", Controller, { {} })
return {
	SettingsController = SettingsController,
}
