import { Store } from "@rbxts/rodux";
import { Events, Functions } from "client/network";
import { DataActions, dataReducer, DataState } from "./reducers";
import { PlayerDataKeys } from "shared/types/Rodux";
import { DEFAULT_PLAYER_DATA } from "shared/constants/PlayerData";

export const clientStore = new Store(dataReducer);
export type ClientStore = typeof clientStore;

clientStore.dispatch({ type: PlayerDataKeys.init, data: DEFAULT_PLAYER_DATA });

// Events.replicatePlayerState.connect((action) => {
// 	const data = <DataActions>HttpService.JSONDecode(action);
// 	clientStore.dispatch(data);
// });

// Events.updateData.connect((data) => {
// 	const playerData = <PlayerData>HttpService.JSONDecode(data);
// 	clientStore.dispatch({ type: PlayerDataKeys.init, data: playerData });
// });

Events.petAction.connect((uuid, action) => {
	switch (action) {
		case "Equip":
			clientStore.dispatch({ type: PlayerDataKeys.updatePet, uuid: uuid, equipped: true });
			break;
		case "Unequip":
			clientStore.dispatch({ type: PlayerDataKeys.updatePet, uuid: uuid, equipped: false });
			break;
		case "Delete":
			clientStore.dispatch({ type: PlayerDataKeys.updatePet, uuid: uuid, delete: true });
			break;
		case "Lock":
			clientStore.dispatch({ type: PlayerDataKeys.updatePet, uuid: uuid, locked: true });
			break;
		case "Unlock":
			clientStore.dispatch({ type: PlayerDataKeys.updatePet, uuid: uuid, locked: false });
			break;
		default:
			break;
	}
});

Events.givePet.connect((petInstance) => {
	clientStore.dispatch({
		type: PlayerDataKeys.givePet,
		uuid: petInstance.uuid,
		pet: petInstance.type,
		rarity: petInstance.rarity,
	});
	print("Pet received");
});
