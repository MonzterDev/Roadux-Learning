-- Compiled with roblox-ts v2.1.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _network = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "network")
local GlobalEvents = _network.GlobalEvents
local GlobalFunctions = _network.GlobalFunctions
local Events = GlobalEvents.server
local Functions = GlobalFunctions.server
return {
	Events = Events,
	Functions = Functions,
}
