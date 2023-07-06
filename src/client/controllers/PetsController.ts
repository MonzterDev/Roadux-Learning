import { Controller, OnStart } from "@flamework/core";
import Roact, { createElement, mount, unmount } from "@rbxts/roact";
import { withHookDetection } from "@rbxts/roact-hooked";
import { Players } from "@rbxts/services";
import { clientStore } from "client/rodux/rodux";
import PetInventory from "client/ui/apps/PetInventory";
import { PetActionButton } from "shared/constants/Pets";

@Controller({})
export class PetsController implements OnStart {
	private player = Players.LocalPlayer;
	private playerGui = this.player.WaitForChild("PlayerGui", 5);

	onStart() {
		withHookDetection(Roact);
		const handle = mount(
			createElement(PetInventory, {
				onClick: () => {
					unmount(handle);
				},
			}),
			this.playerGui,
		);
	}

	public performPetAction(action: PetActionButton) {
		switch (action) {
			case "Equip Best":
				break;
			case "Mass Delete":
				break;
			case "Trash Mode":
				break;
			case "Unequip All":
				this.unequipAll();
				break;
			default:
				break;
		}
	}

	private unequipAll() {}

	private unequipPet(uuid: string) {}
}
