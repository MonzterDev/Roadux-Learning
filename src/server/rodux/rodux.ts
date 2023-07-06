import Rodux, { Store, combineReducers, loggerMiddleware } from "@rbxts/rodux";
import { DefaultAction, dataReducer } from "./reducers";
import { Events } from "server/network";
import { Players } from "@rbxts/services";
import { Dependency } from "@flamework/core";
import { PlayerDataService } from "server/services/PlayerDataService";
import Object from "@rbxts/object-utils";
import { PetInventoryState, petsDataReducer } from "./reducers/pets";
import { Setting } from "shared/constants/Settings";
import { PetAction, PetInstance } from "shared/constants/Pets";
import { SettingState, settingsReducer } from "./reducers/settings";

function replicationMiddleware(nextDispatch: (action: any) => void) {
	return (action: DefaultAction) => {
		nextDispatch(action);

		const cleanedAction = {};
		for (const [key, value] of pairs(action)) {
			if (key !== "meta") {
				cleanedAction[key] = action[key];
			}
		}

		const meta = action.meta;
		if (meta.broadcast) Events.updateState(Players.GetPlayers(), cleanedAction);
		else if (meta.replicateTo) {
			for (const playerId of meta.replicateTo) {
				const player = Players.GetPlayerByUserId(playerId);
				if (player) Events.updateState(player, cleanedAction);
			}
		} else if (meta.playerId) {
			const player = Players.GetPlayerByUserId(meta.playerId);
			if (player) Events.updateState(player, cleanedAction);
		}
	};
}

function profileServiceMiddleware(nextDispatch: (action: any) => void) {
	return (action: DefaultAction) => {
		const oldState = serverStore.getState();
		nextDispatch(action);
		const newState = serverStore.getState();

		const playerDataService = Dependency(PlayerDataService);

		const player = Players.GetPlayerByUserId(action.meta.playerId);
		if (!player) return;

		const profile = playerDataService.getProfile(player);
		if (!profile) return;

		const data = profile.Data;

		for (const key of Object.keys(newState)) {
			const oldData = oldState[key][action.meta.playerId];
			const newData = newState[key][action.meta.playerId];
			switch (key) {
				// case "currencies":
				// 	{
				// 		for (const [currency, amount] of pairs(newData)) {
				// 			if (amount !== oldData[currency as keyof typeof oldData]) {
				// 				data.currency[currency as keyof typeof data.currency] = amount as number;
				// 				break;
				// 			}
				// 		}
				// 	}
				// 	break;
				case "settings":
					{
						for (const [setting, value] of pairs(newData)) {
							if (value !== oldData[setting as keyof typeof oldData]) {
								data.settings[setting as keyof typeof data.settings] = value as boolean;
								break;
							}
						}
					}
					break;
				case "petInventory":
					{
						for (const [uuid, pet] of pairs(newData)) {
							if (pet !== oldData[uuid as keyof typeof oldData]) {
								// data.petInventory[uuid as keyof typeof data.petInventory] = pet as PetInstance;
								print("updated pet");
								break;
							}
						}
					}
					break;
			}
		}
	};
}

export type RootReducer = typeof rootReducer;
export type RootStore = Rodux.Store<RootState, Rodux.Action>;
export interface RootState {
	settings: SettingState;
	petInventory: PetInventoryState;
}

// export interface DataState {
// 	currencies: Record<string, Record<"taps" | "gems", number>>;
// 	settings: Record<string, Record<Setting, boolean>>;
// 	petInventory: Record<string, Record<string, PetInstance>>;
// }

type DataActions = PetAction;

const rootReducer = Rodux.combineReducers({
	petInventory: petsDataReducer,
	settings: settingsReducer,
	dataReducer: dataReducer,
});

export const serverStore = new Store(
	rootReducer,
	{
		// currencies: {},
		settings: {},
		petInventory: {},
	},
	[replicationMiddleware, profileServiceMiddleware],
);
export type ServerStore = typeof serverStore;
