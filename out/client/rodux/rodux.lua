-- Compiled with roblox-ts v2.1.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Store = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "rodux", "src").Store
local dataReducer = TS.import(script, script.Parent, "reducers").dataReducer
local PlayerDataKeys = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "types", "Rodux").PlayerDataKeys
local DEFAULT_PLAYER_DATA = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "constants", "PlayerData").DEFAULT_PLAYER_DATA
local clientStore = Store.new(dataReducer)
clientStore:dispatch({
	type = PlayerDataKeys.init,
	data = DEFAULT_PLAYER_DATA,
})
return {
	clientStore = clientStore,
}
