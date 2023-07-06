import { Action } from "@rbxts/rodux";
import { PlayerData } from "./PlayerData";
import { Setting } from "shared/constants/Settings";
import { PetInstance } from "shared/constants/Pets";

export enum PlayerDataKeys {
	updateCurrency = "updateCurrency",
	addPlayer = "addPlayer",
	removePlayer = "removePlayer",
	updateSetting = "updateSetting",
	updatePet = "updatePet",
	givePet = "givePet",
	renamePet = "renamePet",
}

export interface AddPlayerAction extends Action<PlayerDataKeys.addPlayer> {
	data: PlayerData;
}

export interface UpdateCurrencyAction extends Action<PlayerDataKeys.updateCurrency> {
	amount: number;
	currency: keyof PlayerData["currency"];
}

export interface UpdateSettingAction extends Action<PlayerDataKeys.updateSetting> {
	setting: Setting;
	value: boolean;
}

export interface GivePetAction extends Action<PlayerDataKeys.givePet> {
	pet: PetInstance;
}

export interface UpdatePetAction extends Action<PlayerDataKeys.updatePet> {
	uuid: string;
	equipped?: boolean;
	locked?: boolean;
	delete?: boolean;
}

export interface RenamePetAction extends Action<PlayerDataKeys.renamePet> {
	uuid: string;
	name: string;
}
