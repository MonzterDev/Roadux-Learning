import { Service, OnStart, Dependency } from "@flamework/core";
import { Event } from "@rbxts/roact";
import { HttpService, Players } from "@rbxts/services";
import { Events } from "server/network";
import { PetInstance } from "shared/constants/Pets";
import { PlayerDataService } from "./PlayerDataService";

@Service({})
export class PetsService implements OnStart {
	private playerDataService = Dependency(PlayerDataService);

	onStart() {
		Events.equipPet.connect((player, uuid) => this.equipPet(player, uuid));
		Events.unequipPet.connect((player, uuid) => this.unequipPet(player, uuid));

		task.delay(5, () => {
			print("giving pet");
			Players.GetPlayers().forEach((player) => this.givePet(player));
		});
	}

	private givePet(player: Player) {
		const pet: PetInstance = {
			uuid: HttpService.GenerateGUID(false),
			type: "Dog",
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
		print("Update");
		const profile = this.playerDataService.getProfile(player);
		if (!profile) return;

		print(uuid);
		const pet = profile.data.petInventory[uuid];
		if (!pet) return;

		print("Update");
		pet.equipped = true;
		Events.equipPet(player, uuid);
	}

	private unequipPet(player: Player, uuid: string) {
		const profile = this.playerDataService.getProfile(player);
		if (!profile) return;

		const pet = profile.data.petInventory[uuid];
		if (!pet) return;

		pet.equipped = false;
		Events.unequipPet(player, uuid);
	}
}
