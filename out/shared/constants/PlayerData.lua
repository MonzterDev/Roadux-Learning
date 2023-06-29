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
		["11"] = {
			uuid = "11",
			type = "Dog",
			name = "Test",
			rarity = "Rare",
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
		["3"] = {
			uuid = "3",
			name = "Turt",
			type = "Turtle",
			rarity = "Rare",
			equipped = false,
			locked = true,
		},
		["4"] = {
			uuid = "4",
			name = "Turt",
			type = "Turtle",
			rarity = "Common",
			equipped = false,
			locked = true,
		},
	},
}
return {
	DEFAULT_PLAYER_DATA = DEFAULT_PLAYER_DATA,
}
