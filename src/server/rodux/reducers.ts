import { Action, createReducer } from "@rbxts/rodux";
import { PlayerData } from "shared/types/PlayerData";
import {
	AddPlayerAction,
	GivePetAction,
	PlayerDataKeys,
	RenamePetAction,
	UpdateCurrencyAction,
	UpdatePetAction,
	UpdateSettingAction,
} from "shared/types/Rodux";
import { Pet, PetInstance, Rarity } from "shared/constants/Pets";
import { givePet, renamePet, updatePet } from "./reducers/pets";
import { Setting } from "shared/constants/Settings";
import Object from "@rbxts/object-utils";
import { RootState } from "./rodux";

export interface DefaultAction {
	meta: {
		playerId: number;
		replicateTo?: number[];
		broadcast?: boolean;
	};
}

export type WithDefaultAction<T extends Action<any>> = T & DefaultAction;

export function addPlayer(state: RootState, action: WithDefaultAction<AddPlayerAction>): RootState {
	for (const key of Object.keys(state)) {
		switch (key) {
			// case "currencies":
			// 	state[key][action.meta.playerId] = { taps: action.data.currency.taps, gems: action.data.currency.gems };
			// 	break;
			case "settings":
				state[key][action.meta.playerId] = action.data.settings;
				break;
			case "petInventory":
				state[key][action.meta.playerId] = action.data.petInventory;
				break;
		}
	}

	print(state);
	return state;
}

export interface RemovePlayerAction extends DefaultAction, Action<PlayerDataKeys.removePlayer> {}

export function removePlayer(state: RootState, action: RemovePlayerAction): RootState {
	for (const key of Object.keys(state)) {
		state[key][action.meta.playerId] = undefined as any;
	}
	return state;
}

// export function updateCurrency(state: DataState, action: WithDefaultAction<UpdateCurrencyAction>): DataState {
// 	state.currencies[action.meta.playerId][action.currency] = action.amount;
// 	return state;
// }

// export interface DataState {
// 	currencies: Record<string, Record<"taps" | "gems", number>>;
// 	settings: Record<string, Record<Setting, boolean>>;
// 	petInventory: Record<string, Record<string, PetInstance>>;
// }

export type DataActions = WithDefaultAction<AddPlayerAction> | RemovePlayerAction;

export const dataReducer = createReducer<RootState, DataActions>(
	{ settings: {}, petInventory: {} },
	{
		addPlayer: addPlayer,
		removePlayer: removePlayer,
		// updateCurrency,
	},
);
export type PlayerState = ReturnType<typeof dataReducer>;
