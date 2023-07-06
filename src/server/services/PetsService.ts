import { Service, OnStart, Dependency } from "@flamework/core";
import { Event } from "@rbxts/roact";
import { HttpService, Players, TextService } from "@rbxts/services";
import { Events } from "server/network";
import { PetInstance } from "shared/constants/Pets";
import { PlayerDataService } from "./PlayerDataService";
import { serverStore } from "server/rodux/rodux";
import { PlayerDataKeys } from "shared/types/Rodux";

@Service({})
export class PetsService implements OnStart {
	private playerDataService = Dependency(PlayerDataService);

	onStart() {
		Events.petAction.connect((player, uuid, action) => {
			print("pet action", player, uuid, action);
			switch (action) {
				case "Equip":
					this.equipPet(player, uuid);
					break;
				case "Unequip":
					this.unequipPet(player, uuid);
					break;
				case "Lock":
					this.lockPet(player, uuid);
					break;
				case "Unlock":
					this.unlockPet(player, uuid);
					break;
				case "Delete":
					this.deletePet(player, uuid);
					break;
				default:
					break;
			}
		});
		Events.renamePet.connect((player, uuid, name) => this.renamePet(player, uuid, name));
		Events.deleteAllPets.connect((player) => this.deleteAllPets(player));

		task.delay(5, () => {
			print("giving pet");
			Players.GetPlayers().forEach((player) => this.givePet(player));
		});
	}

	private givePet(player: Player) {
		const pet: PetInstance = {
			uuid: HttpService.GenerateGUID(false),
			type: "Dog",
			name: "Dog",
			rarity: "Common",
			equipped: false,
			locked: false,
		};

		serverStore.dispatch({ type: PlayerDataKeys.givePet, pet: pet, meta: { playerId: player.UserId } });
	}

	private equipPet(player: Player, uuid: string) {
		const playerData = serverStore.getState().petInventory[player.UserId];

		const pet = playerData[uuid];
		if (!pet) return;

		serverStore.dispatch({
			type: PlayerDataKeys.updatePet,
			uuid: uuid,
			equipped: true,
			meta: { playerId: player.UserId },
		});
		print("Pet Equipped", serverStore.getState().petInventory[player.UserId]);
	}

	private unequipPet(player: Player, uuid: string) {
		const playerData = serverStore.getState().petInventory[player.UserId];

		const pet = playerData[uuid];
		if (!pet) return;

		serverStore.dispatch({
			type: PlayerDataKeys.updatePet,
			uuid: uuid,
			equipped: false,
			meta: { playerId: player.UserId },
		});
	}

	private deletePet(player: Player, uuid: string) {
		const playerData = serverStore.getState().petInventory[player.UserId];

		const pet = playerData[uuid];
		if (!pet) return;
		if (pet.locked) return;

		serverStore.dispatch({
			type: PlayerDataKeys.updatePet,
			uuid: uuid,
			delete: true,
			meta: { playerId: player.UserId },
		});
	}

	private lockPet(player: Player, uuid: string) {
		const playerData = serverStore.getState().petInventory[player.UserId];

		const pet = playerData[uuid];
		if (!pet) return;

		serverStore.dispatch({
			type: PlayerDataKeys.updatePet,
			uuid: uuid,
			locked: true,
			meta: { playerId: player.UserId },
		});
	}

	private unlockPet(player: Player, uuid: string) {
		const playerData = serverStore.getState().petInventory[player.UserId];

		const pet = playerData[uuid];
		if (!pet) return;

		serverStore.dispatch({
			type: PlayerDataKeys.updatePet,
			uuid: uuid,
			locked: false,
			meta: { playerId: player.UserId },
		});
	}

	private renamePet(player: Player, uuid: string, name: string) {
		if (name.size() <= 1 && name.size() > 25) return;

		const playerData = serverStore.getState().petInventory[player.UserId];

		const pet = playerData[uuid];
		if (!pet) return;

		const filteredName = TextService.FilterStringAsync(
			name,
			player.UserId,
			Enum.TextFilterContext.PublicChat,
		).GetNonChatStringForBroadcastAsync();

		serverStore.dispatch({
			type: PlayerDataKeys.renamePet,
			uuid: uuid,
			name: filteredName,
			meta: { playerId: player.UserId },
		});
	}

	private deleteAllPets(player: Player) {
		const playerData = serverStore.getState().petInventory[player.UserId];

		for (const [uuid, instance] of pairs(playerData.petInventory)) this.deletePet(player, uuid);
	}
}
