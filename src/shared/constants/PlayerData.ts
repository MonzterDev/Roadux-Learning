import { PlayerData } from "../types/PlayerData";
import { Setting, Settings } from "./Settings";

export const DEFAULT_PLAYER_DATA: PlayerData = {
	taps: 100,
	gems: 100,
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
		"2": {
			uuid: "2",
			name: "Cat",
			type: "Cat",
			rarity: "Rare",
			equipped: false,
			locked: true,
		},
	},
};
