import { Store, loggerMiddleware } from "@rbxts/rodux";
import { DefaultAction, dataReducer } from "./reducers";
import { Events } from "server/network";
import { Players } from "@rbxts/services";

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

export const serverStore = new Store(dataReducer, undefined, [replicationMiddleware]);
export type ServerStore = typeof serverStore;

export function getPlayerData(player: Player) {
	return serverStore.getState()[player.UserId];
}
