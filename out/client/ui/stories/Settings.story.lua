-- Compiled with roblox-ts v2.1.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _roact = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "roact", "src")
local Roact = _roact
local createElement = _roact.createElement
local mount = _roact.mount
local unmount = _roact.unmount
local SettingsApp = TS.import(script, script.Parent.Parent, "apps", "Settings").SettingsApp
local RoactRodux = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "roact-rodux", "src")
local clientStore = TS.import(script, script.Parent.Parent.Parent, "rodux", "rodux").clientStore
local withHookDetection = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "roact-hooked", "src").withHookDetection
withHookDetection(Roact)
-- const mount = (topNode: GuiObect) => {
-- mount(
-- createElement(RoactRodux.StoreProvider, { store: clientStore }, [createElement(SettingsApp)]),
-- this.playerGui,
-- );
-- };
local Mount = function(topNode)
	local tree = mount(createElement(RoactRodux.StoreProvider, {
		store = clientStore,
	}, { createElement(SettingsApp) }), topNode)
	return function()
		return unmount(tree)
	end
end
return Mount
