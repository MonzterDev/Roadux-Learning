import { PetInventory } from "shared/constants/Pets";
import { Setting } from "shared/constants/Settings";

export interface PlayerData {
	currency: {
		taps: number;
		gems: number;
	};
	settings: SettingsData;
	petInventory: PetInventory;
}

export type SettingsData = Record<Setting, boolean>;
