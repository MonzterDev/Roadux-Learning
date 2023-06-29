-- Compiled with roblox-ts v2.1.0
local DEFAULT_PLAYER_DATA = {
	taps = 100,
	gems = 100,
	settings = {
		["Play Music"] = false,
		Combat = true,
	},
	petInventory = {
		["1"] = {
			uuid = "1",
			type = "Dog",
			name = "Test",
			rarity = "Common",
			equipped = true,
			locked = false,
		},
		["2"] = {
			uuid = "2",
			name = "Cat",
			type = "Cat",
			rarity = "Rare",
			equipped = false,
			locked = true,
		},
	},
}
return {
	DEFAULT_PLAYER_DATA = DEFAULT_PLAYER_DATA,
}
