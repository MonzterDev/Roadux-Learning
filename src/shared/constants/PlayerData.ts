import { PlayerData } from "../types/PlayerData";
import { Setting, Settings } from "./Settings";

export const DEFAULT_PLAYER_DATA: PlayerData = {
	currency: {
		taps: 100,
		gems: 100,
	},
	settings: {
		"Play Music": false,
		Combat: true,
	},
	petInventory: {
		"1": {
			uuid: "1",
			type: "Dog",
			name: "Test",
			rarity: "Common",
			equipped: true,
			locked: false,
		},
		"11": {
			uuid: "11",
			type: "Dog",
			name: "Test",
			rarity: "Rare",
			equipped: true,
			locked: false,
		},
		"2": {
			uuid: "2",
			name: "Cat",
			type: "Cat",
			rarity: "Rare",
			equipped: false,
			locked: true,
		},
		"3": {
			uuid: "3",
			name: "Turt",
			type: "Turtle",
			rarity: "Rare",
			equipped: false,
			locked: true,
		},
		"4": {
			uuid: "4",
			name: "Turt",
			type: "Turtle",
			rarity: "Common",
			equipped: false,
			locked: true,
		},
	},
};
