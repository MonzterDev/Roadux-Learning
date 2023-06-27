-- Compiled with roblox-ts v2.1.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _roact = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "roact", "src")
local createElement = _roact.createElement
local mount = _roact.mount
local unmount = _roact.unmount
local SettingsApp = TS.import(script, script.Parent.Parent, "apps", "Settings").SettingsApp
local Mount = function(topNode)
	local tree = mount(createElement(SettingsApp, {
		exitCallback = function() end,
		egg = "Forest",
	}), topNode)
	return function()
		return unmount(tree)
	end
end
return Mount
