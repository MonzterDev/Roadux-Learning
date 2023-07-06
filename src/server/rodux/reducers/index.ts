import Rodux, { Action } from "@rbxts/rodux";
import { PlayerDataKeys } from "shared/types/Rodux";
import Object from "@rbxts/object-utils";

export interface DefaultAction {
	meta: {
		playerId: number;
		replicateTo?: number[];
		broadcast?: boolean;
	};
}

export type WithDefaultAction<T extends Action<any>> = T & DefaultAction;

export interface RemovePlayerAction extends DefaultAction, Action<PlayerDataKeys.removePlayer> {}

export function removePlayer<K extends Record<number, any>>(
	state: K,
	action: WithDefaultAction<RemovePlayerAction>,
): K {
	const newState = Object.deepCopy(state);
	newState[action.meta.playerId] = undefined as any;
	return newState;
}
