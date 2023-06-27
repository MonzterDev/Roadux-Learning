-- Compiled with roblox-ts v2.1.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _rodux = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "rodux", "src")
local combineReducers = _rodux.combineReducers
local Store = _rodux.Store
local HttpService = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").HttpService
local Events = TS.import(script, script.Parent.Parent, "network").Events
local dataReducer = TS.import(script, script.Parent, "reducers").dataReducer
local PlayerDataKeys = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "types", "Rodux").PlayerDataKeys
local combinedReducer = combineReducers({
	data = dataReducer,
})
local clientStore = Store.new(combinedReducer)
Events.replicatePlayerState:connect(function(action)
	local data = HttpService:JSONDecode(action)
	clientStore:dispatch(data)
end)
Events.updateData:connect(function(data)
	local playerData = HttpService:JSONDecode(data)
	clientStore:dispatch({
		type = PlayerDataKeys.init,
		data = playerData,
	})
end)
return {
	clientStore = clientStore,
}
