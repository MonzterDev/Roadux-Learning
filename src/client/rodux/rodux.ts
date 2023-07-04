import { Store } from "@rbxts/rodux";
import { Events, Functions } from "client/network";
import { DataActions, dataReducer, DataState } from "./reducers";
import { PlayerDataKeys } from "shared/types/Rodux";

export const clientStore = new Store(dataReducer);
export type ClientStore = typeof clientStore;

let isDataLoaded = false;

Events.updateState.connect((action) => {
	clientStore.dispatch(action);

	const isAddPlayerAction = (action as { type: PlayerDataKeys }).type === PlayerDataKeys.addPlayer;
	if (!isDataLoaded && isAddPlayerAction) isDataLoaded = true;
});

function GetState() {
	if (isDataLoaded) return;

	Functions.getInitialState.invoke().then((data) => {
		if (data) clientStore.dispatch({ type: PlayerDataKeys.addPlayer, data: data });
		else GetState();
	});
}

GetState();
