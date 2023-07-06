import Rodux, { Action, AnyAction, Store, combineReducers, loggerMiddleware } from "@rbxts/rodux";
import { DefaultAction } from "./reducers";
import { Events } from "server/network";
import { Players } from "@rbxts/services";
import { Dependency } from "@flamework/core";
import { PlayerDataService } from "server/services/PlayerDataService";
import Object from "@rbxts/object-utils";
import { PetInventoryState, petsDataReducer } from "./reducers/petsInventory";
import { Setting } from "shared/constants/Settings";
import { PetAction, PetInstance } from "shared/constants/Pets";
import { SettingActions, SettingState, settingsReducer } from "./reducers/settings";
import { PlayerDataKeys } from "shared/types/Rodux";
import { CurrencyActions, currencyReducer } from "./reducers/currency";

function replicationMiddleware(nextDispatch: (action: any) => void) {
	return (action: DefaultAction) => {
		nextDispatch(action as any);

		const cleanedAction = {};
		for (const [key, value] of pairs(action)) {
			if (key !== "meta") {
				cleanedAction[key] = action[key as never];
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

		if (!oldState) return;

		const newState = serverStore.getState();

		const playerDataService = Dependency(PlayerDataService);

		action.meta.playerId;
		const player = Players.GetPlayerByUserId(action.meta.playerId);
		if (!player) return;

		const profile = playerDataService.getProfile(player);
		if (!profile) return;

		const data = profile.Data;

		for (const key of Object.keys(newState)) {
			const oldData = oldState[key][action.meta.playerId];
			const newData = newState[key][action.meta.playerId];

			if (!oldData || !newData) continue;

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
export type RootState = ReturnType<RootReducer>;

export type DataActions = PetAction | SettingActions | CurrencyActions;

const rootReducer = Rodux.combineReducers({
	petInventory: petsDataReducer,
	settings: settingsReducer,
	currency: currencyReducer,
});

export const serverStore = new Store(
	rootReducer,
	{
		currency: {},
		settings: {},
		petInventory: {},
	},
	[replicationMiddleware, profileServiceMiddleware],
);
export type ServerStore = typeof serverStore;
