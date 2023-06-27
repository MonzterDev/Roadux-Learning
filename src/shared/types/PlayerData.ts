import { Setting } from "shared/constants/Settings";

export interface PlayerData {
	taps: number;
	gems: number;
	settings: SettingsData;
}

export type SettingsData = Record<Setting, boolean>;
