-- Compiled with roblox-ts v2.1.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Flamework = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@flamework", "core", "out").Flamework
return function(context, player, data)
	local playerDataService = Flamework.resolveDependency("server/services/PlayerDataService@PlayerDataService")
	local profile = playerDataService:getProfile(player)
	if not profile then
		return "Profile not found!"
	end
	return profile.data[data]
end
