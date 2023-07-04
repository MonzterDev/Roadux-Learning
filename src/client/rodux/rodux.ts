import { Store } from "@rbxts/rodux";
import { Events, Functions } from "client/network";
import { DataActions, dataReducer, DataState } from "./reducers";
import { PlayerDataKeys } from "shared/types/Rodux";
import { DEFAULT_PLAYER_DATA } from "shared/constants/PlayerData";

export const clientStore = new Store(dataReducer);
export type ClientStore = typeof clientStore;

clientStore.dispatch({ type: PlayerDataKeys.addPlayer, data: DEFAULT_PLAYER_DATA });

Events.updateState.connect((action) => clientStore.dispatch(action));
