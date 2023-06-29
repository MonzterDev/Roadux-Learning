import { Service, OnStart, Dependency } from "@flamework/core";
import { Event } from "@rbxts/roact";
import { HttpService, Players, TextService } from "@rbxts/services";
import { Events } from "server/network";
import { PetInstance } from "shared/constants/Pets";
import { PlayerDataService } from "./PlayerDataService";

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

		const profile = this.playerDataService.getProfile(player);
		if (!profile) return;

		profile.data.petInventory[pet.uuid] = pet;
		Events.givePet(player, pet);
	}

	private equipPet(player: Player, uuid: string) {
		const profile = this.playerDataService.getProfile(player);
		if (!profile) return;

		const pet = profile.data.petInventory[uuid];
		if (!pet) return;

		pet.equipped = true;
		Events.petAction(player, uuid, "Equip");
	}

	private unequipPet(player: Player, uuid: string) {
		const profile = this.playerDataService.getProfile(player);
		if (!profile) return;

		const pet = profile.data.petInventory[uuid];
		if (!pet) return;

		pet.equipped = false;
		Events.petAction(player, uuid, "Unequip");
	}

	private deletePet(player: Player, uuid: string) {
		print("Delete");
		const profile = this.playerDataService.getProfile(player);
		if (!profile) return;

		const pet = profile.data.petInventory[uuid];
		if (!pet) return;

		profile.data.petInventory[uuid] = undefined as never as PetInstance;
		Events.petAction(player, uuid, "Delete");
	}

	private lockPet(player: Player, uuid: string) {
		const profile = this.playerDataService.getProfile(player);
		if (!profile) return;

		const pet = profile.data.petInventory[uuid];
		if (!pet) return;

		pet.locked = true;
		Events.petAction(player, uuid, "Lock");
	}

	private unlockPet(player: Player, uuid: string) {
		const profile = this.playerDataService.getProfile(player);
		if (!profile) return;

		const pet = profile.data.petInventory[uuid];
		if (!pet) return;

		pet.locked = false;
		Events.petAction(player, uuid, "Unlock");
	}

	private renamePet(player: Player, uuid: string, name: string) {
		if (name.size() > 1 && name.size() < 25) return;

		const profile = this.playerDataService.getProfile(player);
		if (!profile) return;

		const pet = profile.data.petInventory[uuid];
		if (!pet) return;

		const filteredName = TextService.FilterStringAsync(
			name,
			player.UserId,
			Enum.TextFilterContext.PublicChat,
		).GetNonChatStringForBroadcastAsync();
		pet.name = filteredName;
		Events.renamePet(player, uuid, name);
	}
}
