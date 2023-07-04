import { Store, loggerMiddleware } from "@rbxts/rodux";
import { DefaultAction, dataReducer } from "./reducers";
import { Events } from "server/network";
import { Players } from "@rbxts/services";
import { Dependency } from "@flamework/core";
import { PlayerDataService } from "server/services/PlayerDataService";

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
		nextDispatch(action);

		const playerDataService = Dependency(PlayerDataService);

		const player = Players.GetPlayerByUserId(action.meta.playerId);
		if (!player) return;

		const profile = playerDataService.getProfile(player);
		if (!profile) return;

		profile.Data = serverStore.getState()[player.UserId];
	};
}
export const serverStore = new Store(dataReducer, undefined, [replicationMiddleware, profileServiceMiddleware]);
export type ServerStore = typeof serverStore;

export function getPlayerData(player: Player) {
	return serverStore.getState()[player.UserId];
}
