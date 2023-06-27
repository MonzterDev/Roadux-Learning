import { combineReducers, Store } from "@rbxts/rodux";
import { HttpService } from "@rbxts/services";
import { Events, Functions } from "client/network";
import { PlayerData } from "shared/types/PlayerData";
import { DataActions, dataReducer, DataState } from "./reducers";
import { PlayerDataKeys } from "shared/types/Rodux";

export interface CombinedState {
	data: DataState;
}

const combinedReducer = combineReducers<CombinedState, DataActions>({
	data: dataReducer,
});

export const clientStore = new Store(combinedReducer);
export type ClientStore = typeof clientStore;

Events.replicatePlayerState.connect((action) => {
	const data = <DataActions>HttpService.JSONDecode(action);
	clientStore.dispatch(data);
});

Events.updateData.connect((data) => {
	const playerData = <PlayerData>HttpService.JSONDecode(data);
	clientStore.dispatch({ type: PlayerDataKeys.init, data: playerData });
});
