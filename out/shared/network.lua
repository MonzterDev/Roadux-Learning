-- Compiled with roblox-ts v2.1.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local createNetworkingEvent = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@flamework", "networking", "out", "events", "createNetworkingEvent").createNetworkingEvent
local t = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "t", "lib", "ts").t
local createNetworkingFunction = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@flamework", "networking", "out", "functions", "createNetworkingFunction").createNetworkingFunction
local GlobalEvents = createNetworkingEvent("shared/network@GlobalEvents", {}, {
	updateData = { { t.string }, nil },
	updateTaps = { { t.number }, nil },
	replicatePlayerState = { { t.string }, nil },
}, nil, nil, nil)
local GlobalFunctions = createNetworkingFunction("shared/network@GlobalFunctions", {
	getData = { { { t.union(t.literal("taps"), t.literal("gems"), t.literal("settings")) }, nil }, t.union(t.literal(false), t.union(t.number, t.interface({
		["Play Music"] = t.boolean,
		Combat = t.boolean,
	}))) },
}, {}, nil, nil, nil)
return {
	GlobalEvents = GlobalEvents,
	GlobalFunctions = GlobalFunctions,
}
