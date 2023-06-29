-- Compiled with roblox-ts v2.1.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local createNetworkingEvent = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@flamework", "networking", "out", "events", "createNetworkingEvent").createNetworkingEvent
local t = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "t", "lib", "ts").t
local createNetworkingFunction = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@flamework", "networking", "out", "functions", "createNetworkingFunction").createNetworkingFunction
local GlobalEvents = createNetworkingEvent("shared/network@GlobalEvents", {
	equipPet = { { t.string }, nil },
	unequipPet = { { t.string }, nil },
	petAction = { { t.string, t.union(t.literal("Equip"), t.literal("Unequip"), t.literal("Delete"), t.literal("Lock"), t.literal("Unlock")) }, nil },
}, {
	updateData = { { t.string }, nil },
	updateTaps = { { t.number }, nil },
	replicatePlayerState = { { t.string }, nil },
	givePet = { { t.interface({
		uuid = t.string,
		type = t.union(t.literal("Dog"), t.literal("Cat"), t.literal("Turtle")),
		rarity = t.union(t.literal("Common"), t.literal("Uncommon"), t.literal("Rare")),
		locked = t.optional(t.union(t.literal(false), t.literal(true))),
		equipped = t.optional(t.union(t.literal(false), t.literal(true))),
	}) }, nil },
	petAction = { { t.string, t.union(t.literal("Equip"), t.literal("Unequip"), t.literal("Delete"), t.literal("Lock"), t.literal("Unlock")) }, nil },
}, nil, nil, nil)
local GlobalFunctions = createNetworkingFunction("shared/network@GlobalFunctions", {
	getData = { { { t.union(t.literal("taps"), t.literal("gems"), t.literal("settings"), t.literal("petInventory")) }, nil }, t.union(t.literal(false), t.union(t.number, t.map(t.string, t.interface({
		uuid = t.string,
		type = t.union(t.literal("Dog"), t.literal("Cat"), t.literal("Turtle")),
		rarity = t.union(t.literal("Common"), t.literal("Uncommon"), t.literal("Rare")),
		locked = t.optional(t.union(t.literal(false), t.literal(true))),
		equipped = t.optional(t.union(t.literal(false), t.literal(true))),
	})), t.interface({
		["Play Music"] = t.boolean,
		Combat = t.boolean,
	}))) },
}, {}, nil, nil, nil)
return {
	GlobalEvents = GlobalEvents,
	GlobalFunctions = GlobalFunctions,
}
